document.addEventListener('DOMContentLoaded', () => {
    const topics = [
        {
            title: "Cosmology",
            description: "The study of the universe's origin, structure, and evolution.",
            moreInfo: ["Cosmology investigates phenomena like the Big Bang, cosmic microwave background, and galaxy formation.",
                "It uses physics, astronomy, and mathematics to understand the universe at large scales.",
                "Observations from telescopes and satellites inform theoretical models of the cosmos."],
            img: "img/cosmology.jpg",
            bgImg: "img/cosm1.jpg",
            diagramType: "bigBang"
        },
        {
            title: "Evolution",
            description: "The study of how species change over time.",
            moreInfo: ["Evolution explains the diversity of life through natural selection and genetic drift.",
                "Species adapt to their environments over generations.",
                "Fossil records and DNA analysis provide strong evidence for evolution."],
            img: "img/evolution.jpg",
            bgImg: "img/evol1.jpg",
            diagramType: "branchingLine"
        },
        {
            title: "Quantum Mechanics",
            description: "The branch of physics dealing with atomic and subatomic behavior.",
            moreInfo: ["Quantum Mechanics explores superposition, entanglement, and uncertainty principles.",
                "It challenges classical intuition and shows probabilities govern particle behavior.",
                "Applications include lasers, semiconductors, and quantum computing."],
            img: "img/quantum.jpg",
            bgImg: "img/qm1.jpg",
            diagramType: "superPozicija"
        },
        {
            title: "Chemistry",
            description: "The study of matter, its properties, and reactions.",
            moreInfo: ["Chemistry studies atoms, molecules, reactions, bonds, acids, bases, thermodynamics, and kinetics.",
                "It explains substances' composition and behavior.",
                "Chemistry impacts medicine, energy, environment, and materials."],
            img: "img/chemistry.jpg",
            bgImg: "img/chem1.jpg",
            diagramType: "elektron"
        },
        {
            title: "Mathematics",
            description: "The study of numbers, shapes, structures, and patterns.",
            moreInfo: ["Mathematics provides tools to model, analyze, and solve problems.",
                "It ranges from arithmetic to advanced fields like algebra and topology.",
                "Math underpins logic, algorithms, and many technological advances."],
            img: "img/mathematics.jpg",
            bgImg: "img/math1.jpg",
            diagramType: "pi"
        },
        {
            title: "Medicine",
            description: "The science and practice of diagnosing, treating, and preventing disease.",
            moreInfo: ["Medicine combines biology, chemistry, and technology to improve health.",
                "Covers specialties like surgery, pharmacology, and public health.",
                "Modern medicine uses research, trials, and innovations like vaccines."],
            img: "img/medicine.jpg",
            bgImg: "img/med1.jpg",
            diagramType: "srce"
        }
    ];

    const container = document.getElementById('glossary_container');
    const modal = document.getElementById('modal_container');

    topics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'glossary_card';

        const img = document.createElement('img');
        img.src = topic.img;
        img.alt = topic.title;
        card.appendChild(img);

        const h3 = document.createElement('h3');
        h3.textContent = topic.title;
        card.appendChild(h3);

        const p = document.createElement('p');
        p.textContent = topic.description;
        card.appendChild(p);

        card.addEventListener('click', () => {
            const paragraphs = topic.moreInfo.map(p => `<p>${p}</p>`).join('');
            modal.innerHTML = `
                <div class="modal_overlay"></div>
                <div class="modal_content" style="background-image: url('${topic.bgImg}');">
                    <span class="modal_close">&times;</span>
                    <div class="modal_text_overlay">
                        <h2>${topic.title}</h2>
                        ${paragraphs}
                    </div>
                    <canvas class="modal_diagram"></canvas>
                </div>
            `;
            modal.classList.add('show');

            modal.querySelector('.modal_close').addEventListener('click', () => modal.classList.remove('show'));
            modal.querySelector('.modal_overlay').addEventListener('click', () => modal.classList.remove('show'));

            const diagramPoints = [
                { x: 0.05, y: 0.8 }, { x: 0.25, y: 0.4 }, { x: 0.5, y: 0.6 }, { x: 0.75, y: 0.3 }, { x: 0.95, y: 0.5 }
            ];

            drawDiagram('.modal_diagram', topic.diagramType);
        });

        container.appendChild(card);
    });

    const navToggle = document.querySelector('.nav_toggle');
    const navList = document.querySelector('.nav_list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
});
