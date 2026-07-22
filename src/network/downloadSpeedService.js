const DOWNLOAD_URL = import.meta.env.VITE_DOWNLOAD_URL;

export async function downloadSpeedTest(onProgress) {
    const controller = new AbortController();

    const startTime = performance.now();
    let receivedBytes = 0;

    // Stop after 10 seconds
    setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(
            `${DOWNLOAD_URL}?t=${Date.now()}`,
            {
                signal: controller.signal,
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Download Failed");
        }

        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            receivedBytes += value.length;

            const elapsed =
                (performance.now() - startTime) / 1000;

            const speed =
                (receivedBytes * 8) /
                elapsed /
                1_000_000;

            if (onProgress) {
                onProgress(speed.toFixed(2));
            }
        }
    } catch (err) {
        if (err.name !== "AbortError") {
            console.error(err);
        }
    }

    const totalTime =
        (performance.now() - startTime) / 1000;

    return (
        (receivedBytes * 8) /
        totalTime /
        1_000_000
    ).toFixed(2);
}