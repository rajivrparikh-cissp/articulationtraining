import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const sessionId = formData.get('sessionId') as string;
    const audioFile = formData.get('audio') as Blob;

    if (!sessionId || !audioFile) {
      return NextResponse.json({ error: 'Missing sessionId or audio file' }, { status: 400 });
    }

    // In production, stream to Google Cloud Storage Audio Vault and trigger Fastify worker
    return NextResponse.json({
      success: true,
      sessionId,
      byteSize: audioFile.size,
      status: 'INGESTED_FOR_EVALUATION'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Audio ingestion failure' }, { status: 500 });
  }
}
