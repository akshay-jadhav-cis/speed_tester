const API_URL = "http://localhost:8080/upload";

const STREAMS = 4;
const CHUNK_SIZE = 1024 * 1024; // 1 MB
const TEST_DURATION = 10000; // 10 seconds

// Upload a single chunk
async function uploadChunk(blob) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: blob,
    });

    if (!response.ok) {
        throw new Error("Upload Failed");
    }

    return response.json();
}

// One worker uploads continuously until the test ends
async function uploadWorker(stopTime, blob, onBytesUploaded) {
    let uploadedBytes = 0;

    while (performance.now() < stopTime) {
        await uploadChunk(blob);

        uploadedBytes += blob.size;

        if (onBytesUploaded) {
            onBytesUploaded(blob.size);
        }
    }

    return uploadedBytes;
}

// Main upload speed test
export async function uploadSpeedTest(onProgress) {

    const blob = new Blob([new Uint8Array(CHUNK_SIZE)]);

    const stopTime = performance.now() + TEST_DURATION;

    let uploadedBytes = 0;

    const startTime = performance.now();

    // Update speed every 200 ms
    const interval = setInterval(() => {

        const elapsed = (performance.now() - startTime) / 1000;

        const speedMbps =
            (uploadedBytes * 8) / elapsed / 1_000_000;

        if (onProgress) {
            onProgress(speedMbps.toFixed(2));
        }

    }, 200);

    const workers = [];

    for (let i = 0; i < STREAMS; i++) {
        workers.push(
            uploadWorker(
                stopTime,
                blob,
                (bytes) => {
                    uploadedBytes += bytes;
                }
            )
        );
    }

    const results = await Promise.all(workers);

    clearInterval(interval);

    const totalBytes = results.reduce((sum, bytes) => sum + bytes, 0);

    const totalTime = (performance.now() - startTime) / 1000;

    const averageSpeed =
        (totalBytes * 8) / totalTime / 1_000_000;

    return averageSpeed.toFixed(2);
}