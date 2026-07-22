import { Alert } from "bootstrap"
import { useState } from "react"
import { uploadSpeedTest } from "./uploadSpeedService";
import { downloadSpeedTest } from "./downloadSpeedService";
export default function Tester() {
    const [uploadSpeed, setUploadSpeed] = useState("---");
    const [downloadSpeed, setDownloadSpeed] = useState("---");
    const handleTestClick = () => {
        console.log("button Click")
    }
    const handleUpload = async () => {
        const average = await uploadSpeedTest((liveSpeed) => {
            setUploadSpeed(liveSpeed); // Updates every 200 ms
        });

        console.log("Average Upload:", average);

        setUploadSpeed(average);
    }
    const handleDownload = async () => {
        console.log("Download Button Clicked");
        const average = await downloadSpeedTest(
            (liveSpeed) => {
                setDownloadSpeed(liveSpeed);
            }
        );

        console.log("Average Download:", average);

        setDownloadSpeed(average);
    }
    return (
        <>
            <div className="container mt-5">
                <div style={{ border: "2px black solid", boxSizing: "border-box", textAlign: "center", padding: "10px", margin: "10px", borderRadius: "10px" }}> <h2>BroadBand Speed Tester</h2>
                    <p>Check Your Internet Speed </p>
                    <button onClick={handleTestClick} className="btn btn-outline-primary">Test Speed </button>
                </div>
            </div>
            <div className="container mt-4">
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body text-center">
                            <h3>Download Speed</h3>
                            <button onClick={handleDownload} className="btn btn-primary">Test</button>
                            <strong>{downloadSpeed}</strong>

                            <p>Mbps</p>
                        </div>
                    </div>

                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body text-center">
                            <h3>Upload Speed</h3>
                            <button onClick={handleUpload}>Upload Speed measure</button>
                            <br />

                            <strong>{uploadSpeed}</strong>

                            <p>Mbps</p>
                        </div>
                    </div>

                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body text-center">
                            <h3>Ping</h3>
                        </div>
                    </div>
                </div>
            </div>        </>
    )
}