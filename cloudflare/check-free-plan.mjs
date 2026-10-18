import assert from 'node:assert/strict';

// Conservative cost gate: do not infer free usage from a successful deployment
// or a zero base price. Account subscriptions can have metered charges.
export function verifyNoSubscriptions(data) {
  if (data?.success !== true || !Array.isArray(data.result)) throw new Error('COST_UNVERIFIED: invalid billing response');
  if (data.result.length !== 0 || (data.result_info?.total_count ?? 0) !== 0) {
    throw new Error('COST_UNVERIFIED: account subscriptions exist; no automatic paid-plan approval');
  }
  if (data.errors?.length) throw new Error('COST_UNVERIFIED: billing response contains errors');
}

if (process.argv.includes('--self-test')) {
  verifyNoSubscriptions({ success: true, result: [], result_info: { total_count: 0 } });
  for (const data of [null, { success: false, result: [] }, { success: true },
    { success: true, result: [{ price: 0 }] },
    { success: true, result: [], result_info: { total_count: 1 } },
    { success: true, result: [], errors: [{ code: 1 }] }]) {
    assert.throws(() => verifyNoSubscriptions(data));
  }
  console.log('Cost gate: missing, failed, paid/unknown and incomplete responses rejected: OK');
} else {
  try {
    const account = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token = process.env.CLOUDFLARE_BILLING_READ_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
    if (!account || !/^[a-f0-9]{32}$/i.test(account) || !token) throw new Error('COST_UNVERIFIED: billing credentials unavailable');
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/subscriptions`, {
      method: 'GET', headers: { Authorization: `Bearer ${token}` },
      redirect: 'error', signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`COST_UNVERIFIED: billing read HTTP ${response.status}; Billing Read access required`);
    verifyNoSubscriptions(await response.json());
    console.log('COST_GATE_PASS: account subscription list verified empty; no paid subscription enabled by this workflow.');
  } catch (error) {
    // Never log response bodies, account identifiers or tokens.
    console.error(error.message.startsWith('COST_UNVERIFIED:') ? error.message : 'COST_UNVERIFIED: billing lookup failed');
    process.exitCode = 1;
  }
}
