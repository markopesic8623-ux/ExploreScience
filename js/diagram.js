function drawDiagram(canvasSelector, type) {
    const canvas = $(canvasSelector)[0];
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (type) {
        case "bigBang":
            let radius = 0;
            function expandCircle() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "#00ffff";
                ctx.lineWidth = 2;
                ctx.stroke();
                if (radius < Math.min(canvas.width, canvas.height) / 2) {
                    radius += 0.3;
                    requestAnimationFrame(expandCircle);
                }
            }
            expandCircle();
            break;

        case "branchingLine":
            const branches = [
                [{ x: 0.5, y: 0.9 }, { x: 0.5, y: 0.6 }, { x: 0.3, y: 0.4 }],
                [{ x: 0.5, y: 0.6 }, { x: 0.7, y: 0.4 }]
            ];
            let progress = 0;
            function drawBranches() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "#00ff00";
                ctx.lineWidth = 2;
                branches.forEach(branch => {
                    ctx.beginPath();
                    ctx.moveTo(branch[0].x * canvas.width, branch[0].y * canvas.height);
                    for (let i = 1; i <= Math.floor(progress) && i < branch.length; i++) {
                        ctx.lineTo(branch[i].x * canvas.width, branch[i].y * canvas.height);
                    }
                    if (progress < branch.length - 1) {
                        const curr = branch[Math.floor(progress)];
                        const next = branch[Math.floor(progress) + 1];
                        const fraction = progress - Math.floor(progress);
                        const x = curr.x * canvas.width + (next.x - curr.x) * fraction * canvas.width;
                        const y = curr.y * canvas.height + (next.y - curr.y) * fraction * canvas.height;
                        ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                });
                if (progress < branches[0].length) {
                    progress += 0.02;
                    requestAnimationFrame(drawBranches);
                }
            }
            drawBranches();
            break;

        case "elektron":
            let ugao = 0;
            const centarX = canvas.width / 2; 
            const centarY = canvas.height / 2;
            const orbita = Math.min(canvas.width, canvas.height) / 4;
            function orbit() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // nukleus
                ctx.beginPath();
                ctx.arc(centarX, centarY, 10, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
                // elektron
                ctx.beginPath();
                const elektronX = centarX + orbita * Math.cos(ugao);
                const elektronY = centarY + orbita * Math.sin(ugao);
                ctx.arc(elektronX, elektronY, 6, 0, 2 * Math.PI);
                ctx.fillStyle = "blue";
                ctx.fill();
                ugao += 0.05;
                requestAnimationFrame(orbit);
            }
            orbit();
            break;

        case "superPozicija":
            const start = { x: 0.1, y: 0.8 };
            const mid1 = { x: 0.5, y: 0.3 };
            const mid2 = { x: 0.5, y: 0.3 };
            const end = { x: 0.9, y: 0.7 };
            let tSplit = 0;

            function superPozicija() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const factor = 0.3 * Math.sin(tSplit * 0.05); // controls divergence

                // prva
                ctx.beginPath();
                ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
                ctx.lineTo(mid1.x * canvas.width - factor * canvas.width, mid1.y * canvas.height - factor * canvas.height);
                ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
                ctx.strokeStyle = "#ff00ff";
                ctx.lineWidth = 2;
                ctx.stroke();

                // druga
                ctx.beginPath();
                ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
                ctx.lineTo(mid2.x * canvas.width + factor * canvas.width, mid2.y * canvas.height - factor * canvas.height);
                ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
                ctx.stroke();

                tSplit++;
                requestAnimationFrame(superPozicija);
            }

            superPozicija();
            break;

        case "pi":
            const text = "π = 3.14159265358979323846264338327950288419716939937510…";
            let i1 = 0;
            function writePi() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "24px Arial";
                ctx.fillStyle = "#ffff00";
                ctx.fillText(text.slice(0, i1), 10, canvas.height / 2);
                if (i1 < text.length) {
                    i1++;
                    setTimeout(writePi, 200);
                }
            }
            writePi();
            break;

        case "srce":
            let t = 0;
            const otkucaj = 0.01; // manji brojevi, brze kuca
            const baza = 3;        // baza
            const amplituda = 1.2;  // amp
            function srce() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const faktor = Math.pow(Math.sin(t * otkucaj * Math.PI), 2);
                const skala = baza + amplituda * faktor;

                ctx.beginPath();
                for (let a = 0; a < Math.PI * 2; a += 0.01) {
                    const x = skala * 16 * Math.pow(Math.sin(a), 3);
                    const y = -skala * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
                    ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 + y);
                }
                ctx.fillStyle = "red";
                ctx.fill();
                t++;
                requestAnimationFrame(srce);
            }
            srce();
            break;


    }
}
