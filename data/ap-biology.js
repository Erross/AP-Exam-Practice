// ============================================================================
// AP Biology — original, unofficial multiple-choice practice bank
// ============================================================================
//
// Aligned to the AP Biology Course and Exam Description effective Fall 2025
// (the framework currently governing the 2027 exam cycle). No released or
// secure College Board item is reproduced here. Experimental data, diagrams,
// organisms, and scenarios are original practice material created for this app.
//
// Section I format: 60 single-select questions in 90 minutes, mixing discrete
// questions with 4–5-question sets tied to shared experimental data or models.
// Every item records a CED topic code and a primary AP Biology science skill.
//
// This bank intentionally remains a draft until independent content review and
// the full release gate are complete.
// ============================================================================

const BIO_STIMULI = {
  u1Macromolecules: {
    type: "quantitative",
    title: "Hydrolysis of three purified polymers",
    source: "Original simulated experiment created for AP Exam Practice.",
    columns: ["Polymer", "Products after complete hydrolysis", "Nitrogen detected?", "Phosphorus detected?"],
    rows: [
      ["P", "glucose only", "No", "No"],
      ["Q", "amino acids", "Yes", "No"],
      ["R", "pentose sugar, phosphate, nitrogenous bases", "Yes", "Yes"],
    ],
  },
  u2Membrane: {
    type: "visual",
    title: "Transport across a model cell membrane",
    source: "Original diagram created for AP Exam Practice.",
    image: "assets/ap-biology/membrane-transport.svg",
    alt: "A phospholipid bilayer separates outside from cytosol. Solute X passes directly through the bilayer down its gradient, solute Y passes down its gradient through a channel, and solute Z moves against its gradient through a pump coupled to ATP conversion.",
  },
  u3Enzyme: {
    type: "quantitative",
    title: "Initial reaction rate of enzyme E",
    source: "Original simulated experiment created for AP Exam Practice.",
    columns: ["Substrate (mM)", "No inhibitor", "Inhibitor A", "Inhibitor B"],
    rows: [
      ["0.5", "8", "4", "6"],
      ["1.0", "14", "8", "9"],
      ["2.0", "22", "15", "12"],
      ["5.0", "31", "28", "15"],
      ["10.0", "32", "31", "16"],
    ],
  },
  u4Signal: {
    type: "visual",
    title: "A receptor-mediated response pathway",
    source: "Original diagram created for AP Exam Practice.",
    image: "assets/ap-biology/signal-pathway.svg",
    alt: "An extracellular ligand binds a membrane receptor. The receptor activates relay protein A, which activates enzyme B. Enzyme B produces many molecules of second messenger C, leading to activation of a response protein. A phosphatase removes phosphate groups from relay components.",
  },
  u5Cross: {
    type: "quantitative",
    title: "Offspring from a testcross involving two genes",
    source: "Original simulated experiment created for AP Exam Practice.",
    columns: ["Offspring phenotype", "Observed number"],
    rows: [
      ["long wings, red eyes", "412"],
      ["short wings, brown eyes", "398"],
      ["long wings, brown eyes", "94"],
      ["short wings, red eyes", "96"],
    ],
  },
  u6Expression: {
    type: "visual",
    title: "Regulation of a bacterial metabolic operon",
    source: "Original diagram created for AP Exam Practice.",
    image: "assets/ap-biology/operon-regulation.svg",
    alt: "A regulatory gene produces a repressor. In condition one the repressor occupies the operator beside a promoter and transcription is low. In condition two a small molecule binds the repressor, the operator is unoccupied, and RNA polymerase transcribes three adjacent structural genes.",
  },
  u7Phylogeny: {
    type: "visual",
    title: "Relationships among five hypothetical species",
    source: "Original diagram created for AP Exam Practice.",
    image: "assets/ap-biology/phylogeny.svg",
    alt: "A rooted cladogram shows species A branching first. Species B branches next. Species C is sister to a clade in which species D and E share the most recent common ancestor. Derived characters are marked along the branches.",
  },
  u8Population: {
    type: "quantitative",
    title: "Growth of a freshwater protist population",
    source: "Original simulated experiment created for AP Exam Practice.",
    columns: ["Day", "Population in control", "Population with predator"],
    rows: [
      ["0", "20", "20"],
      ["2", "62", "51"],
      ["4", "176", "104"],
      ["6", "342", "138"],
      ["8", "396", "126"],
      ["10", "401", "132"],
    ],
  },
};

const BIO_QUESTIONS = [];
const BIO_UNIT_COUNTS = {};

function bioQuestion(unit, topicCode, topic, skill, stem, correct, distractors, stimulusGroupId, stimulus) {
  const number = (BIO_UNIT_COUNTS[unit] || 0) + 1;
  BIO_UNIT_COUNTS[unit] = number;
  const correctIndex = BIO_QUESTIONS.length % 4;
  const options = distractors.slice();
  options.splice(correctIndex, 0, correct);
  BIO_QUESTIONS.push({
    id: `apbio-${unit.toLowerCase()}-${String(number).padStart(3, "0")}`,
    unit,
    topicCode,
    topic,
    skill,
    type: "s",
    stimulusGroupId: stimulusGroupId || null,
    ...(stimulus ? { stimulus } : {}),
    q: stem,
    o: options,
    c: [correctIndex],
    e: `${correct}. This item applies CED Topic ${topicCode}, ${topic}.`,
  });
}

const q = bioQuestion;

// Unit 1 — Chemistry of Life
q("U1", "1.1", "Structure of Water and Hydrogen Bonding", "1.B", "Why does evaporative cooling lower the temperature of a leaf?", "High-energy water molecules escape after disrupting hydrogen bonds.", ["Covalent bonds within water release stored heat when they break.", "Nonpolar water molecules dissolve into air and carry glucose with them.", "Ionic bonds between adjacent water molecules absorb carbon dioxide."]);
q("U1", "1.2", "Elements of Life", "1.C", "A plant is supplied with carbon dioxide containing carbon-14. Which molecule is most likely to contain carbon-14 first?", "A three-carbon sugar produced during the Calvin cycle", ["Oxygen released from splitting water in a chloroplast", "ATP synthesized by chemiosmosis in a mitochondrion", "A phosphate group transferred directly from soil nitrate"]);
q("U1", "1.3", "Introduction to Macromolecules", "1.B", "Which reaction directly joins two monomers into a biological polymer?", "Dehydration synthesis that forms a covalent bond", ["Addition of water while breaking a covalent bond", "Transfer of electrons to oxygen during respiration", "Diffusion of both monomers through a membrane channel"]);
q("U1", "1.4", "Carbohydrates", "2.B", "Cellulose and starch are both polymers of glucose. Why do they perform different biological functions?", "Their glucose monomers are linked by bonds with different orientations.", ["Only cellulose contains carbon, hydrogen, and oxygen atoms.", "Starch monomers are amino acids whereas cellulose monomers are sugars.", "Only starch can form hydrogen bonds with surrounding water molecules."]);
q("U1", "1.5", "Lipids", "6.E", "A membrane phospholipid is altered so that both fatty acid tails become shorter and more unsaturated. At the same temperature, the membrane will most likely become", "more fluid because tail interactions are reduced", ["less fluid because the polar heads pack more tightly", "impermeable because unsaturated tails form covalent cross-links", "rigid because shorter tails contain more stored chemical energy"]);
q("U1", "1.6", "Nucleic Acids", "2.A", "Which feature distinguishes RNA nucleotides from DNA nucleotides?", "A hydroxyl group on ribose's 2′ carbon", ["RNA nucleotides contain phosphate whereas DNA nucleotides do not.", "RNA nucleotides contain peptide bonds between adjacent bases.", "RNA nucleotides always contain thymine instead of uracil."]);
q("U1", "1.7", "Proteins", "6.E", "Replacing a charged amino acid on the surface of a soluble enzyme with a nonpolar amino acid is most likely to affect the enzyme by", "altering interactions that help stabilize its three-dimensional shape", ["changing every peptide bond into a phosphodiester bond", "preventing ribosomes from reading the enzyme's mRNA", "removing the amino group from all remaining amino acids"]);
q("U1", "1.1", "Structure of Water and Hydrogen Bonding", "2.B", "Water rises through narrow xylem vessels partly because water molecules adhere to vessel walls and cohere to one another. Which property accounts for both interactions?", "The partial charges produced by water's polarity", ["The equal sharing of electrons in each O–H bond", "The absence of intermolecular attractions in liquid water", "The ability of water to ionize every dissolved molecule"]);
q("U1", "1.5", "Lipids", "1.C", "A hibernating mammal stores much of its long-term energy in triacylglycerols rather than glycogen. What best explains this pattern?", "More energy-rich C–H bonds and little associated water", ["Glycogen cannot be hydrolyzed by enzymes in animal cells.", "Triacylglycerols are polymers whose monomers enter glycolysis directly.", "Glycogen contains no carbon atoms that can be oxidized."]);
q("U1", "1.7", "Proteins", "3.B", "A student predicts that heating an enzyme to 90°C will permanently reduce its activity. Which result best supports the prediction?", "Low activity persists after cooling to the original temperature.", ["Activity increases while both enzyme and substrate are heated.", "Activity returns immediately when additional substrate is added at 90°C.", "Activity is unchanged when an unheated enzyme receives less substrate."]);

q("U1", "1.4", "Carbohydrates", "4.B", "Based on the hydrolysis results, polymer P is most likely", "a polysaccharide", ["a polypeptide", "a phospholipid", "a nucleic acid"], "apbio-g-u1-macromolecules", BIO_STIMULI.u1Macromolecules);
q("U1", "1.7", "Proteins", "4.B", "Which observation most strongly supports identifying polymer Q as a protein?", "Its hydrolysis products are amino acids and contain nitrogen.", ["Its monomers are all glucose and contain no nitrogen.", "Its products include phosphate and nitrogenous bases.", "Its products form a bilayer spontaneously in water."], "apbio-g-u1-macromolecules", BIO_STIMULI.u1Macromolecules);
q("U1", "1.6", "Nucleic Acids", "2.B", "The components recovered from polymer R indicate that adjacent monomers were joined by", "phosphodiester bonds in a sugar-phosphate backbone", ["peptide bonds between amino and carboxyl groups", "glycosidic bonds between glucose molecules", "hydrogen bonds between fatty acid tails"], "apbio-g-u1-macromolecules", BIO_STIMULI.u1Macromolecules);
q("U1", "1.3", "Introduction to Macromolecules", "3.C", "Which control would best show that the detected products resulted from hydrolysis rather than contamination in the reagents?", "Process a tube containing all reagents but no polymer.", ["Use twice as much of every polymer in a second trial.", "Measure the mass of each dry polymer before adding water.", "Incubate each polymer at a different temperature."], "apbio-g-u1-macromolecules", BIO_STIMULI.u1Macromolecules);
q("U1", "1.2", "Elements of Life", "6.B", "Which claim is best supported by the results for polymers Q and R?", "Nitrogen occurs in multiple classes of biological macromolecules.", ["Every nitrogen-containing polymer also contains phosphorus.", "Carbon is absent from polymers that contain nitrogen.", "Only nucleic acids can be assembled by dehydration reactions."], "apbio-g-u1-macromolecules", BIO_STIMULI.u1Macromolecules);

// Unit 2 — Cells
q("U2", "2.1", "Cell Structure and Function", "1.C", "A pancreatic cell synthesizes and secretes large amounts of digestive enzyme. Which structures should be especially abundant?", "Rough endoplasmic reticulum and Golgi apparatus", ["Smooth endoplasmic reticulum and central vacuole", "Lysosomes and chloroplasts", "Centrioles and cell wall"]);
q("U2", "2.2", "Cell Size", "5.A", "Two spherical cells have radii of 1 μm and 2 μm. Compared with the smaller cell, the larger cell has", "half as much surface area per unit volume", ["twice as much surface area per unit volume", "four times as much surface area per unit volume", "the same surface area per unit volume"]);
q("U2", "2.3", "Plasma Membrane", "2.B", "Why do phospholipids form bilayers in water?", "Polar heads face water while nonpolar tails cluster inward.", ["Hydrophobic heads form covalent bonds with water molecules.", "Hydrophilic tails repel one another and face the bilayer center.", "All phospholipid regions carry identical electrical charges."]);
q("U2", "2.4", "Membrane Permeability", "6.E", "A drug makes a membrane more permeable to protons. Which process would be most directly disrupted in mitochondria?", "Chemiosmotic ATP production", ["DNA replication driven by complementary base pairing", "Protein folding within the mitochondrial matrix", "Pyruvate production during cytosolic glycolysis"]);
q("U2", "2.5", "Membrane Transport", "1.B", "Oxygen moves from an alveolus into a capillary without direct energy input. This movement is an example of", "simple diffusion down a concentration gradient", ["active transport against an electrochemical gradient", "endocytosis through a membrane vesicle", "facilitated diffusion through an ATP-powered pump"]);
q("U2", "2.6", "Facilitated Diffusion", "6.E", "A mutation removes glucose carrier proteins from a cell membrane. Which outcome is most likely?", "Carrier-mediated glucose uptake decreases.", ["Glucose begins crossing the bilayer by ATP-powered phagocytosis.", "Water can no longer cross the membrane by osmosis.", "The cell exports glucose faster against its concentration gradient."]);
q("U2", "2.7", "Tonicity and Osmoregulation", "5.A", "A plant cell has solute potential −0.7 MPa and pressure potential +0.3 MPa. It is placed in a solution with water potential −0.2 MPa. Initially, water will", "move into the cell; its water potential is −0.4 MPa", ["move out because the cell's pressure potential is positive", "remain at equilibrium because both contain negative solute potential", "move out because the solution has the higher solute concentration"]);
q("U2", "2.8", "Mechanisms of Transport", "1.B", "The sodium-potassium pump moves ions against their gradients by", "using ATP-dependent shape changes in a membrane protein", ["allowing ions to diffuse through the phospholipid interior", "coupling ion movement to the hydrolysis of extracellular glucose", "forming vesicles that engulf individual sodium ions"]);
q("U2", "2.9", "Cell Compartmentalization", "6.E", "If lysosomal membranes suddenly became permeable to their hydrolytic enzymes, what would most likely occur?", "Cytoplasmic macromolecules and organelles would be damaged.", ["Photosynthetic electron transport would accelerate.", "Ribosomes would begin synthesizing DNA rather than protein.", "The nucleus would export chromosomes through nuclear pores."]);
q("U2", "2.10", "Origins of Cell Compartmentalization", "6.B", "Which observation most strongly supports the endosymbiotic origin of mitochondria?", "Mitochondria contain circular DNA and divide independently within cells.", ["Mitochondria occur only in multicellular organisms.", "Mitochondria are assembled by the Golgi apparatus during mitosis.", "Mitochondria and nuclei contain identical numbers of chromosomes."]);

q("U2", "2.4", "Membrane Permeability", "2.B", "Which solute in the model is most likely small and nonpolar?", "Solute X, which crosses without a membrane protein", ["Solute Y, because every polar solute crosses directly through lipids", "Solute Z, because ATP hydrolysis makes molecules nonpolar", "All three, because membrane proteins transport only lipids"], "apbio-g-u2-membrane", BIO_STIMULI.u2Membrane);
q("U2", "2.6", "Facilitated Diffusion", "2.B", "The movement of solute Y is best classified as", "facilitated diffusion through a selective channel", ["primary active transport by an ATPase", "simple diffusion through the bilayer", "receptor-mediated endocytosis"], "apbio-g-u2-membrane", BIO_STIMULI.u2Membrane);
q("U2", "2.8", "Mechanisms of Transport", "6.E", "If ATP production stops, which movement shown should decrease most directly?", "Transport of solute Z against its gradient", ["Movement of solute X down its gradient", "Movement of solute Y through an open channel", "Random collision of all solutes with the membrane"], "apbio-g-u2-membrane", BIO_STIMULI.u2Membrane);
q("U2", "2.3", "Plasma Membrane", "3.C", "Which manipulation would best test whether the protein used by solute Y is selective?", "Compare Y with a similar solute using the same channel.", ["Measure only the amount of phospholipid in one untreated membrane.", "Add ATP and determine whether solute X becomes a protein.", "Remove all extracellular water and observe membrane thickness."], "apbio-g-u2-membrane", BIO_STIMULI.u2Membrane);
q("U2", "2.5", "Membrane Transport", "6.C", "A mutation holds the Z pump open as a passive pore. What is the most likely long-term result?", "The Z gradient dissipates toward equilibrium.", ["The Z gradient steepens without any energy input.", "Solute X stops crossing the phospholipid bilayer.", "The membrane becomes covalently attached to ATP."], "apbio-g-u2-membrane", BIO_STIMULI.u2Membrane);

// Unit 3 — Cellular Energetics
q("U3", "3.1", "Enzymes", "1.B", "An enzyme speeds a reaction primarily by", "lowering the reaction's activation energy", ["making the reaction's overall free-energy change more negative", "increasing the equilibrium concentration of products", "supplying atoms that are permanently consumed by the reaction"]);
q("U3", "3.1", "Enzymes", "2.B", "A substrate binds an enzyme through induced fit. Which statement best describes the interaction?", "Binding alters enzyme shape in a way that favors catalysis.", ["The substrate permanently changes the enzyme's amino acid sequence.", "The enzyme converts an endergonic reaction into an exergonic one.", "The active site is rigid and unrelated to substrate structure."]);
q("U3", "3.2", "Environmental Impacts on Enzyme Function", "3.B", "A human enzyme has maximum activity near pH 7. Which prediction is most reasonable at pH 2?", "Activity will decrease because altered ionic interactions can change active-site shape.", ["Activity will increase because every enzyme requires abundant hydrogen ions.", "Activity will remain identical because pH affects substrates but never proteins.", "Activity will stop only because peptide bonds instantly hydrolyze at pH 2."]);
q("U3", "3.2", "Environmental Impacts on Enzyme Function", "3.C", "To determine the effect of temperature on catalase activity, which variable should be held constant?", "The concentration of hydrogen peroxide substrate", ["The temperature assigned to each treatment", "The measured rate of oxygen production", "The identity of the independent variable"]);
q("U3", "3.3", "Cellular Energy", "1.B", "Cells commonly couple an endergonic reaction to ATP hydrolysis because", "the combined free-energy change can be negative", ["ATP hydrolysis prevents energy from being conserved", "ATP supplies carbon atoms for every biosynthetic product", "the phosphate bonds of ATP require no energy to break"]);
q("U3", "3.3", "Cellular Energy", "6.E", "An uncoupling protein permits protons to cross the inner mitochondrial membrane without ATP synthase. The cell will most likely", "make less ATP and release more heat", ["produce more ATP while consuming less oxygen", "stop oxidizing NADH but increase the proton gradient", "convert all mitochondrial ATP directly into glucose"]);
q("U3", "3.4", "Photosynthesis", "2.B", "The oxygen released during photosynthesis originates directly from", "water molecules split at photosystem II", ["carbon dioxide fixed by rubisco", "glucose oxidized in the Calvin cycle", "chlorophyll molecules reduced by NADPH"]);
q("U3", "3.4", "Photosynthesis", "6.E", "A herbicide blocks electron transfer from photosystem II. Which product will decrease first?", "NADPH generated by the light reactions", ["Carbon dioxide released by pyruvate oxidation", "Oxygen consumed by mitochondrial complex IV", "Lactate generated during fermentation"]);
q("U3", "3.5", "Cellular Respiration", "1.B", "What is the primary function of fermentation in a cell lacking oxygen?", "Regenerate NAD+ so glycolysis can continue", ["Produce more ATP per glucose than oxidative phosphorylation", "Transfer electrons from oxygen to glucose", "Generate acetyl-CoA inside the chloroplast"]);
q("U3", "3.5", "Cellular Respiration", "2.C", "Most ATP made during aerobic cellular respiration is produced when", "protons flow through ATP synthase", ["glucose is split into two pyruvate molecules in glycolysis", "carbon dioxide is fixed into an organic molecule", "oxygen donates electrons to the first respiratory complex"]);

q("U3", "3.1", "Enzymes", "4.B", "What do the no-inhibitor data suggest as substrate concentration increases from 5 to 10 mM?", "The enzyme approaches substrate saturation.", ["The enzyme becomes denatured because the rate falls to zero.", "The reaction reverses because product concentration is lower.", "The amount of enzyme doubles between the two treatments."], "apbio-g-u3-enzyme", BIO_STIMULI.u3Enzyme);
q("U3", "3.2", "Environmental Impacts on Enzyme Function", "5.A", "At 2.0 mM substrate, inhibitor A reduces the initial rate by approximately", "32 percent", ["7 percent", "68 percent", "147 percent"], "apbio-g-u3-enzyme", BIO_STIMULI.u3Enzyme);
q("U3", "3.1", "Enzymes", "6.B", "Which claim about inhibitor A is best supported by the data?", "High substrate concentration largely overcomes A's effect.", ["It permanently destroys every enzyme molecule at all substrate concentrations.", "It increases maximum reaction rate by stabilizing the transition state.", "It acts only after the substrate has been converted to product."], "apbio-g-u3-enzyme", BIO_STIMULI.u3Enzyme);
q("U3", "3.2", "Environmental Impacts on Enzyme Function", "5.D", "Which conclusion about inhibitor B is best supported?", "Increasing substrate does not restore the uninhibited maximum rate.", ["Inhibitor B has no measurable effect at any substrate concentration.", "Inhibitor B is converted into additional substrate at high concentration.", "The enzyme has a higher maximum rate when inhibitor B is present."], "apbio-g-u3-enzyme", BIO_STIMULI.u3Enzyme);
q("U3", "3.3", "Cellular Energy", "3.D", "Which follow-up would best distinguish whether inhibitor B binds the enzyme or chemically alters the substrate?", "Preincubate enzyme or substrate separately with B, then assay each.", ["Repeat one treatment without measuring reaction rate.", "Increase both enzyme and substrate while also changing pH.", "Record the color of inhibitor B before adding any reactants."], "apbio-g-u3-enzyme", BIO_STIMULI.u3Enzyme);

// Unit 4 — Cell Communication and Cell Cycle
q("U4", "4.1", "Cell Communication", "1.C", "Yeast cells release mating factors that bind receptors on nearby cells of the opposite mating type. This is an example of", "local signaling between cells", ["endocrine signaling through a circulatory system", "direct transfer of chromosomes by mitosis", "negative feedback within a single enzyme"]);
q("U4", "4.2", "Introduction to Signal Transduction", "2.B", "A steroid hormone can bind an intracellular receptor because the hormone", "is sufficiently nonpolar to cross the plasma membrane", ["is transported through an ATP-powered ion channel", "contains a signal peptide that opens nuclear pores", "is produced only inside the responding cell"]);
q("U4", "4.3", "Signal Transduction Pathways", "6.E", "A mutation prevents a G protein from hydrolyzing GTP. After receptor activation, the most likely effect is", "prolonged signaling because the G protein remains active", ["failure of the ligand to bind its extracellular receptor", "immediate destruction of every second messenger", "permanent closure of all nuclear pores"]);
q("U4", "4.4", "Feedback", "1.B", "In a negative-feedback loop regulating body temperature, sweating after body temperature rises tends to", "reduce the original deviation from the set point", ["amplify the temperature increase until a new tissue forms", "prevent receptors from detecting future temperature changes", "convert the loop into positive feedback by conserving heat"]);
q("U4", "4.5", "Cell Cycle", "2.A", "During which stage are sister chromatids separated and moved toward opposite poles?", "Anaphase", ["G1 phase", "S phase", "Prophase"]);
q("U4", "4.6", "Regulation of Cell Cycle", "6.E", "Loss of a functional p53 protein can promote cancer because damaged cells may", "divide despite damage instead of undergoing apoptosis", ["lose the ability to synthesize any membrane phospholipid", "perform meiosis instead of mitosis in all somatic tissues", "stop receiving nutrients through the bloodstream"]);
q("U4", "4.4", "Feedback", "1.C", "During childbirth, uterine contractions stimulate oxytocin release, which strengthens contractions. This is positive feedback because", "the response amplifies the initiating stimulus", ["the response restores a variable to a fixed set point", "the hormone permanently blocks its own receptor", "the stimulus and response occur in unrelated organisms"]);
q("U4", "4.5", "Cell Cycle", "5.B", "A control culture has a mitotic index of 18% ± 2% (95% confidence interval), while a growth-factor culture has 26% ± 2%. What is the best interpretation?", "The nonoverlapping intervals support a higher mitotic index after growth-factor treatment.", ["The overlapping intervals prove that the growth factor has no effect.", "The intervals show that every treated cell entered mitosis.", "The control mean is higher because its interval begins at a smaller value."]);
q("U4", "4.6", "Regulation of Cell Cycle", "3.C", "Which treatment is the best negative control when testing whether a growth factor increases cell division?", "Cells receiving the same solvent without growth factor", ["Cells receiving growth factor at the highest concentration", "Cells counted only after the experiment is complete", "Cells grown at a different temperature and density"]);
q("U4", "4.3", "Signal Transduction Pathways", "2.C", "Why can a small amount of extracellular ligand produce a large cellular response?", "Successive activation steps can amplify the signal.", ["Each ligand molecule is converted into a chromosome.", "The receptor supplies unlimited matter to the pathway.", "Second messengers prevent all enzymes from being reused."]);

q("U4", "4.2", "Introduction to Signal Transduction", "2.A", "Which component directly receives the information from outside the cell?", "The membrane receptor that binds the ligand", ["The response protein at the end of the pathway", "The intracellular phosphatase", "The ribosome that translated relay protein A"], "apbio-g-u4-signal", BIO_STIMULI.u4Signal);
q("U4", "4.3", "Signal Transduction Pathways", "2.B", "The production of many C molecules by one activated B molecule illustrates", "signal amplification within the transduction pathway", ["DNA replication before cell division", "competitive inhibition at the receptor", "simple diffusion of the ligand through the membrane"], "apbio-g-u4-signal", BIO_STIMULI.u4Signal);
q("U4", "4.3", "Signal Transduction Pathways", "6.E", "A mutation prevents protein A from being activated. What is the most likely result after ligand binding?", "B remains inactive, so little C is produced.", ["The receptor begins synthesizing additional ligand.", "The phosphatase converts directly into RNA polymerase.", "C accumulates independently of every upstream component."], "apbio-g-u4-signal", BIO_STIMULI.u4Signal);
q("U4", "4.4", "Feedback", "6.E", "A drug inhibits the phosphatase shown. Compared with an untreated cell, the response will most likely", "persist longer after the extracellular ligand is removed", ["end sooner because relay proteins are dephosphorylated faster", "never begin because the ligand cannot reach the receptor", "cause the membrane to lose all phospholipids"], "apbio-g-u4-signal", BIO_STIMULI.u4Signal);
q("U4", "4.1", "Cell Communication", "3.C", "Which experiment would best test whether the response requires the membrane receptor?", "Compare ligand responses with and without the receptor gene.", ["Measure the ligand concentration without exposing any cells.", "Compare two cell types while changing ligand dose and temperature together.", "Remove protein B and conclude that ligand binding never occurred."], "apbio-g-u4-signal", BIO_STIMULI.u4Signal);

// Unit 5 — Heredity
q("U5", "5.1", "Meiosis", "2.A", "What event reduces chromosome number from diploid to haploid?", "Separation of homologous chromosomes during meiosis I", ["Replication of DNA before meiosis", "Separation of sister chromatids during mitosis", "Fusion of two haploid gametes at fertilization"]);
q("U5", "5.1", "Meiosis", "6.E", "Nondisjunction of homologous chromosomes in meiosis I can produce gametes that", "all contain an abnormal number of that chromosome", ["all contain the normal haploid chromosome number", "are genetically identical to the diploid parent cell", "lack every chromosome except the affected pair"]);
q("U5", "5.2", "Meiosis and Genetic Diversity", "1.B", "Crossing over increases genetic variation by", "exchanging corresponding DNA segments between homologous chromosomes", ["randomly deleting one chromosome from every gamete", "copying mitochondrial DNA into the nucleus", "preventing homologous chromosomes from pairing"]);
q("U5", "5.2", "Meiosis and Genetic Diversity", "5.A", "For a species with n = 4, independent assortment alone can produce how many chromosome combinations in gametes?", "16", ["4", "8", "32"]);
q("U5", "5.3", "Mendelian Genetics", "5.A", "Two heterozygous parents are crossed for a complete-dominance trait. What is the probability that an offspring shows the recessive phenotype?", "1/4", ["1/2", "3/4", "1"]);
q("U5", "5.3", "Mendelian Genetics", "6.B", "A testcross is useful for determining the genotype of an individual with a dominant phenotype because the individual is crossed with", "a homozygous recessive partner whose gametes reveal the unknown alleles", ["a homozygous dominant partner that masks every recessive allele", "an unrelated species with a similar visible trait", "a heterozygous partner that produces only dominant gametes"]);
q("U5", "5.4", "Non-Mendelian Genetics", "1.C", "A heterozygous flower is pink when the two homozygotes are red and white. This pattern is", "incomplete dominance", ["complete dominance", "sex linkage", "polygenic inheritance"]);
q("U5", "5.4", "Non-Mendelian Genetics", "2.B", "A mother carries an X-linked recessive allele and the father lacks it. What fraction of their sons is expected to express the trait?", "One-half", ["None", "One-fourth", "All"]);
q("U5", "5.5", "Environmental Effects on Phenotype", "3.C", "To test whether temperature affects coat color in a mammal, researchers should", "raise genetically similar animals at different temperatures while holding other conditions constant", ["compare unrelated species living in different habitats", "change temperature and diet together in each treatment", "measure coat color in one animal at one time point"]);
q("U5", "5.5", "Environmental Effects on Phenotype", "6.C", "Identical twins can differ in adult height even though they inherited the same alleles. The best explanation is that", "environmental conditions can influence expression of a polygenic phenotype", ["identical twins undergo different versions of the genetic code", "height alleles are removed from all somatic cells after birth", "environment never interacts with genotype during development"]);

q("U5", "5.3", "Mendelian Genetics", "4.B", "Which offspring classes represent the parental allele combinations?", "Long-red and short-brown, because they are most frequent", ["Long-brown and short-red, because they are least frequent", "All four classes equally, because every testcross gives 1:1:1:1", "Only long-red, because both traits are dominant"], "apbio-g-u5-cross", BIO_STIMULI.u5Cross);
q("U5", "5.4", "Non-Mendelian Genetics", "5.A", "What is the estimated recombination frequency between the two genes?", "19 percent", ["9.4 percent", "39.8 percent", "81 percent"], "apbio-g-u5-cross", BIO_STIMULI.u5Cross);
q("U5", "5.4", "Non-Mendelian Genetics", "6.B", "Which claim is best supported by the offspring distribution?", "The genes are linked but crossing over sometimes separates their alleles.", ["The genes assort independently on different chromosomes.", "Crossing over never occurs between the genes.", "Both genes are carried only in mitochondrial DNA."], "apbio-g-u5-cross", BIO_STIMULI.u5Cross);
q("U5", "5.2", "Meiosis and Genetic Diversity", "6.E", "If the genes were farther apart on the same chromosome, which change would be expected?", "The recombinant classes would make up a larger fraction of offspring.", ["The parental classes would become the only offspring.", "Every offspring would become homozygous for both genes.", "Meiosis I would no longer separate homologous chromosomes."], "apbio-g-u5-cross", BIO_STIMULI.u5Cross);
q("U5", "5.3", "Mendelian Genetics", "5.C", "Under independent assortment, 250 offspring are expected in each class. The calculated chi-square is approximately 385; the critical value at p = 0.05 with 3 degrees of freedom is 7.815. The researcher should", "reject independent assortment because 385 exceeds the critical value", ["fail to reject independent assortment because all four classes occur", "accept independent assortment because 385 exceeds the sample size", "remove the recombinant classes before comparing the values"], "apbio-g-u5-cross", BIO_STIMULI.u5Cross);

// Unit 6 — Gene Expression and Regulation
q("U6", "6.1", "DNA and RNA Structure", "2.A", "The two strands of DNA are antiparallel, meaning that", "their sugar-phosphate backbones run in opposite 5′-to-3′ directions", ["one strand contains ribose while the other contains deoxyribose", "purines pair with purines and pyrimidines pair with pyrimidines", "one strand is protein and the other is nucleic acid"]);
q("U6", "6.2", "DNA Replication", "1.B", "DNA polymerase synthesizes a new strand by", "adding nucleotides to the 3′ end using a template strand", ["joining amino acids from the 5′ end of a ribosome", "adding nucleotides to both ends without a template", "breaking hydrogen bonds between codons and anticodons"]);
q("U6", "6.3", "Transcription and RNA Processing", "2.B", "Which modification occurs to most eukaryotic pre-mRNA before export from the nucleus?", "Introns are removed and exons are joined.", ["Every uracil is replaced with thymine.", "The RNA is translated into protein inside the nucleus.", "A second complementary RNA strand is permanently attached."]);
q("U6", "6.4", "Translation", "2.B", "During translation, the anticodon of a tRNA pairs with", "a complementary codon on mRNA", ["a promoter sequence on DNA", "an amino acid on a growing protein", "a phospholipid in the ribosomal membrane"]);
q("U6", "6.5", "Regulation of Gene Expression", "1.C", "A transcription factor increases expression of a eukaryotic gene by binding an enhancer. The enhancer most directly affects", "assembly or activity of the transcription machinery at the promoter", ["the amino acid sequence of every ribosomal protein", "the chromosome number of the cell", "the diffusion of glucose across the plasma membrane"]);
q("U6", "6.6", "Gene Expression and Cell Specialization", "6.B", "Muscle and nerve cells in one organism contain the same genome but make different proteins. This observation supports the claim that", "cell specialization depends largely on differential gene expression", ["each cell type permanently deletes all unused genes", "different cell types use different genetic codes", "only nerve cells contain regulatory DNA sequences"]);
q("U6", "6.7", "Mutations", "6.E", "A single-nucleotide insertion near the beginning of a coding sequence is likely to have a large effect because it", "shifts the reading frame for downstream codons", ["changes one base without affecting any later codon", "prevents DNA from containing phosphate groups", "converts the entire gene into a lipid"]);
q("U6", "6.8", "Biotechnology", "1.C", "Which task is PCR specifically designed to perform?", "amplify a selected DNA region through repeated cycles of replication", ["separate proteins solely according to their charge", "translate mRNA into protein without ribosomes", "edit chromosomes by crossing over during meiosis"]);
q("U6", "6.8", "Biotechnology", "2.B", "In gel electrophoresis, shorter DNA fragments generally move farther because they", "pass more easily through pores in the gel matrix", ["carry a stronger positive charge than longer fragments", "contain more genes and therefore repel the wells", "are converted into RNA as they move"]);
q("U6", "6.7", "Mutations", "3.B", "A mutation changes a codon but not the encoded amino acid. The most likely explanation is that", "multiple codons can specify the same amino acid", ["ribosomes translate DNA without reading codons", "every mutation is removed before transcription", "amino acids determine the nucleotide sequence of mRNA"]);

q("U6", "6.5", "Regulation of Gene Expression", "2.B", "In condition one, low transcription is most directly caused by", "the repressor occupying the operator and blocking RNA polymerase", ["the structural genes leaving the chromosome", "the promoter being translated into protein", "the small molecule destroying every ribosome"], "apbio-g-u6-operon", BIO_STIMULI.u6Expression);
q("U6", "6.5", "Regulation of Gene Expression", "6.E", "A mutation prevents the repressor from binding the small molecule but does not affect operator binding. What is expected in condition two?", "The repressor remains on the operator and transcription stays low.", ["RNA polymerase transcribes at a higher rate than normal.", "The regulatory gene is converted into structural gene 1.", "The structural genes replicate without DNA polymerase."], "apbio-g-u6-operon", BIO_STIMULI.u6Expression);
q("U6", "6.5", "Regulation of Gene Expression", "6.E", "A deletion removes the operator but leaves the promoter intact. The structural genes will most likely be", "transcribed constitutively because the repressor cannot block the promoter", ["never transcribed because RNA polymerase binds only operators", "translated directly from DNA without mRNA", "removed from every daughter cell during binary fission"], "apbio-g-u6-operon", BIO_STIMULI.u6Expression);
q("U6", "6.6", "Gene Expression and Cell Specialization", "3.C", "Which measurement would most directly test whether condition two changes transcription rather than protein stability?", "Quantify structural-gene mRNA in both conditions.", ["Measure only the final metabolite concentration.", "Count the total number of phospholipids in each cell.", "Determine the amino acid sequence of the unchanged repressor."], "apbio-g-u6-operon", BIO_STIMULI.u6Expression);
q("U6", "6.1", "DNA and RNA Structure", "2.C", "Why can the three structural genes be transcribed together in this bacterial system?", "They share a promoter and are included in one polycistronic mRNA.", ["Each gene is located in a separate nucleus.", "All three proteins have identical amino acid sequences.", "The repressor functions as a DNA polymerase."], "apbio-g-u6-operon", BIO_STIMULI.u6Expression);

// Unit 7 — Natural Selection
q("U7", "7.1", "Introduction to Natural Selection", "1.B", "Natural selection acts directly on", "heritable phenotypic variation among individuals", ["traits that organisms acquire because they need them", "allele frequencies chosen consciously by a population", "mutations produced only after an environmental challenge"]);
q("U7", "7.2", "Natural Selection", "6.C", "After pesticide use, resistant insects make up a larger fraction of a population. The best explanation is that", "resistant insects left more surviving offspring than susceptible insects", ["the pesticide caused every insect to develop the same resistance allele", "susceptible insects intentionally changed their DNA before reproducing", "resistance prevented inheritance of alleles by offspring"]);
q("U7", "7.3", "Artificial Selection", "1.C", "Selective breeding differs from natural selection because in selective breeding", "humans choose which individuals reproduce based on desired traits", ["no heritable variation exists in the population", "acquired traits are always transmitted to offspring", "mutations and recombination do not occur"]);
q("U7", "7.4", "Population Genetics", "5.A", "In a population of 100 diploid organisms, an allele appears in 60 heterozygotes and 20 homozygotes. Its frequency is", "0.50", ["0.20", "0.40", "0.80"]);
q("U7", "7.5", "Hardy–Weinberg Equilibrium", "5.A", "If q² = 0.09 in a Hardy–Weinberg population, the expected frequency of heterozygotes is", "0.42", ["0.09", "0.30", "0.49"]);
q("U7", "7.6", "Evidence of Evolution", "6.B", "Similar forelimb bone arrangements in whales, bats, and humans provide evidence of", "descent from a common ancestor with subsequent modification", ["independent origin without inherited structural constraints", "identical ecological roles in all three species", "inheritance of traits acquired through repeated use"]);
q("U7", "7.7", "Common Ancestry", "2.C", "Which molecular observation best supports common ancestry of all living organisms?", "Nearly universal use of the same genetic code", ["Different species use completely unrelated amino acids", "Only eukaryotes contain nucleic acids", "Every organism has the same chromosome number"]);
q("U7", "7.8", "Continuing Evolution", "6.E", "A viral population can evolve rapidly in one host because", "short generation times and mutation create variation on which selection acts", ["viruses direct their mutations toward antibodies", "each viral particle contains every possible allele", "natural selection stops once infection begins"]);
q("U7", "7.9", "Phylogeny", "2.B", "On a cladogram, two taxa are most closely related when they", "share the most recent common ancestor", ["appear closest together on the printed page", "have the greatest number of analogous traits", "occupy habitats with the same climate"]);
q("U7", "7.10", "Speciation", "1.B", "Allopatric speciation commonly begins when", "geographic separation reduces gene flow between populations", ["individuals within one population mate completely at random", "natural selection eliminates all genetic variation", "two species fuse into one shared gene pool"]);

q("U7", "7.11", "Variations in Populations", "2.A", "Which pair of species shares the most recent common ancestor in the model?", "Species D and E", ["Species A and B", "Species A and E", "Species B and C"], "apbio-g-u7-phylogeny", BIO_STIMULI.u7Phylogeny);
q("U7", "7.9", "Phylogeny", "6.E", "If species E is removed from the analysis, which relationship remains supported?", "Species C and D share a more recent ancestor than either shares with B.", ["Species A becomes the sister species of D.", "Species B and D become the same species.", "Species C must have evolved directly from species D."], "apbio-g-u7-phylogeny", BIO_STIMULI.u7Phylogeny);
q("U7", "7.6", "Evidence of Evolution", "2.C", "A newly discovered species possesses the derived character marked after B branches but lacks the character uniting D and E. Where should it be placed?", "Within the clade containing C, D, and E but outside the D–E clade", ["Before the common ancestor of all five species", "As the direct ancestor of species A", "Inside the D–E clade regardless of other evidence"], "apbio-g-u7-phylogeny", BIO_STIMULI.u7Phylogeny);
q("U7", "7.10", "Speciation", "6.B", "Which claim cannot be established from the cladogram alone?", "Species D and E can still interbreed and produce fertile offspring.", ["D and E share a more recent ancestor with each other than with C.", "A diverged before the common ancestor of B through E.", "C belongs to the same larger clade as D and E."], "apbio-g-u7-phylogeny", BIO_STIMULI.u7Phylogeny);
q("U7", "7.12", "Origins of Life on Earth", "3.D", "Researchers propose that a primitive self-replicating molecule preceded DNA genomes. Which investigation best tests a key part of that proposal?", "Determine whether an RNA molecule can both store sequence information and catalyze a reaction.", ["Compare adult body sizes of the five species.", "Measure whether modern DNA can diffuse through a phospholipid bilayer.", "Test whether all proteins contain the same amino acid sequence."], "apbio-g-u7-phylogeny", BIO_STIMULI.u7Phylogeny);

// Unit 8 — Ecology
q("U8", "8.1", "Responses to the Environment", "1.C", "A plant bends toward a window because cells on the shaded side elongate more than cells on the lit side. This response is", "a directional growth response to an environmental cue", ["random genetic drift within the plant population", "a learned behavior requiring a nervous system", "competitive exclusion between two plant species"]);
q("U8", "8.2", "Energy Flow Through Ecosystems", "5.A", "If producers store 20,000 kJ of energy and ecological transfer efficiency is 10%, approximately how much reaches secondary consumers?", "200 kJ", ["20 kJ", "2,000 kJ", "18,000 kJ"]);
q("U8", "8.3", "Population Ecology", "4.A", "Which graph would best represent changes in two populations measured at the same six time points?", "A line graph with time on the x-axis and a separate line for each population", ["A pie chart with one slice for each measurement day", "A histogram with organism names as continuous intervals", "A scatterplot with no axes, scale, units, or legend"]);
q("U8", "8.4", "Effect of Density on Populations", "1.B", "Which factor is most clearly density dependent?", "Transmission of a contagious disease", ["A volcanic eruption", "A sudden freeze", "A regional drought"]);
q("U8", "8.5", "Community Ecology", "1.C", "Two barnacle species use the same intertidal space, but one occupies a smaller realized niche when the other is present. This pattern most directly demonstrates", "interspecific competition", ["primary succession", "mutualism", "genetic drift"]);
q("U8", "8.6", "Biodiversity", "6.B", "Why can greater genetic diversity increase a population's persistence during environmental change?", "Some individuals may carry alleles that confer survival under the new conditions.", ["Every individual becomes genetically identical after the change.", "Genetic diversity prevents all mutations from occurring.", "High diversity guarantees unlimited resources and no competition."]);
q("U8", "8.7", "Disruptions in Ecosystems", "6.E", "Removal of a keystone predator is most likely to", "cause large community changes through altered prey abundance", ["affect only the predator without changing other species", "increase energy at every trophic level without limit", "prevent any future primary production"]);
q("U8", "8.2", "Energy Flow Through Ecosystems", "2.C", "Why is energy flow through an ecosystem not cyclic?", "Energy is dissipated as heat during metabolic transformations.", ["Atoms are destroyed whenever organisms respire.", "Decomposers return all energy directly to sunlight.", "Consumers create new energy from inorganic matter."]);
q("U8", "8.5", "Community Ecology", "3.A", "A harmless species resembles a toxic species. Which question is directly testable?", "Do predators attack mimic-colored individuals less often than nonmimetic individuals?", ["Is mimicry the most beautiful adaptation in the ecosystem?", "Should every harmless species evolve the same coloration?", "Does resemblance prove that the two species share identical genomes?"]);
q("U8", "8.7", "Disruptions in Ecosystems", "3.C", "To test whether fertilizer runoff causes an algal bloom, investigators should compare replicated ponds that", "differ only in fertilizer concentration and are monitored over time", ["receive different fertilizer, light, temperature, and fish treatments", "contain algae but are measured only before fertilizer is added", "receive fertilizer without any untreated comparison ponds"]);

q("U8", "8.3", "Population Ecology", "4.B", "The control population is closest to carrying capacity on which days?", "Days 8 and 10", ["Days 0 and 2", "Days 2 and 4", "Days 4 and 6"], "apbio-g-u8-population", BIO_STIMULI.u8Population);
q("U8", "8.3", "Population Ecology", "5.A", "What is the approximate per-capita growth rate of the control population from day 0 to day 2, expressed per day using the starting population?", "1.05 per day", ["0.48 per day", "2.10 per day", "3.10 per day"], "apbio-g-u8-population", BIO_STIMULI.u8Population);
q("U8", "8.4", "Effect of Density on Populations", "6.A", "Which claim about the predator treatment is best supported?", "Predation lowers the apparent equilibrium abundance of the protist population.", ["Predation causes the protist population to become extinct by day 4.", "Predators increase the protist's carrying capacity above 400.", "Predators have no effect after the initial population is established."], "apbio-g-u8-population", BIO_STIMULI.u8Population);
q("U8", "8.5", "Community Ecology", "3.C", "Which additional treatment would best test whether predator density changes the protist equilibrium?", "Use several initial predator densities while holding nutrients and starting protist density constant.", ["Change predator density, temperature, and nutrient concentration together.", "Measure predator color instead of population size.", "Remove all replication from the predator treatment."], "apbio-g-u8-population", BIO_STIMULI.u8Population);
q("U8", "8.6", "Biodiversity", "6.E", "If the protist population contains heritable variation in predator avoidance, continued predation is most likely to", "increase the frequency of avoidance-associated alleles over generations", ["cause every individual to acquire the same allele during its lifetime", "eliminate inheritance because predators reduce population size", "prevent differential reproductive success among phenotypes"], "apbio-g-u8-population", BIO_STIMULI.u8Population);

window.QUESTIONS_AP_BIOLOGY = BIO_QUESTIONS;
