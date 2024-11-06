import { NextRequest, NextResponse } from 'next/server';
import { getKafkaProducer } from '@/lib/kafka';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { code, requestId } = reqBody;

        if (!code || !requestId) {
            return NextResponse.json({ success: false, error: "Code and requestId are required." }, { status: 400 });
        }

        const producer = await getKafkaProducer();
        await producer.send({
            topic: 'brolang',
            messages: [{ value: JSON.stringify({ code, requestId }) }],
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error pushing to Kafka:', error);
        return NextResponse.json({ success: false, error: "Server Error! Please try again!" }, { status: 500 });
    }
}
