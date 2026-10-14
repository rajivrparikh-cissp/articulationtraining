import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'generate-options') {
      return NextResponse.json({
        challenge: 'sample_cryptographic_challenge_base64',
        rp: { name: 'ExecutiveVoice', id: 'localhost' },
        user: {
          id: 'user_candidate_1',
          name: 'candidate@executivevoice.ai',
          displayName: 'Executive Candidate'
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }]
      });
    }

    if (action === 'verify-registration') {
      return NextResponse.json({
        verified: true,
        credentialId: 'cred_sample_hardware_token',
        sessionToken: 'sample_jwt_executive_token'
      });
    }

    return NextResponse.json({ error: 'Unsupported WebAuthn action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'WebAuthn error' }, { status: 500 });
  }
}
