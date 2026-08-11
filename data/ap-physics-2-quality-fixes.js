// AP Physics 2 — post-release quality hardening from the 2026-08 independent audit.
// Replaces recall-heavy giveaway items with AP-style proportional, representational,
// and claim/evidence reasoning while preserving the existing CED topic/skill metadata.

(function () {
  "use strict";

  const bank = window.QUESTIONS_AP_PHYSICS_2;
  const byId = new Map(bank.map((item) => [item.id, item]));
  const patch = (id, attrs) => {
    const item = byId.get(id);
    if (!item) throw new Error(`${id}: Physics 2 quality-fix target missing`);
    Object.assign(item, attrs);
  };

  patch("apphys2-u9-010", {
    q: "Rod A and rod B connect the same hot and cold reservoirs and have equal cross-sectional area. Rod A has twice B's thermal conductivity but half B's length. In steady state, how does A's conductive heat-transfer rate compare with B's?",
    o: ["One-fourth as large", "The same", "Twice as large", "Four times as large"],
    c: [3],
    e: "For steady conduction, the rate is proportional to kAΔT/L. The reservoirs and areas are the same, so rateA/rateB=(2k/k)(LB/(LB/2))=4. Both the larger conductivity and shorter length increase A's rate."
  });

  patch("apphys2-u10-009", {
    q: "Points P and Q lie on the same radial line from an isolated positive point charge, with Q twice as far from the charge as P. Which field-vector comparison is correct?",
    o: [
      "Both vectors point outward, and EP = 4EQ",
      "Both vectors point outward, and EP = 2EQ",
      "P points outward while Q points inward, and EP = 4EQ",
      "Both vectors point inward, and EP = EQ/4"
    ],
    c: [0],
    e: "A positive point charge produces an outward electric field. Its magnitude follows E=kq/r², so doubling distance reduces the field by a factor of four; therefore EP=4EQ."
  });

  patch("apphys2-u11-009", {
    q: "Wire X has twice the resistivity of wire Y, half Y's length, and half Y's cross-sectional area. What is RX/RY?",
    o: ["1/2", "1", "2", "4"],
    c: [2],
    e: "Using R=ρL/A, RX/RY=(2ρ)(L/2)/(A/2) divided by ρL/A = 2. The shorter length cuts resistance in half, but the doubled resistivity and halved area each increase it."
  });

  patch("apphys2-u11-012", {
    q: "Resistors R and 2R carry the same constant current for the same time interval. How does the electrical energy converted to thermal energy in the 2R resistor compare with that in R?",
    o: ["Half as much", "The same amount", "Twice as much", "Four times as much"],
    c: [2],
    e: "For equal current, P=I²R, so the 2R resistor dissipates twice the power. Equal time intervals then give E=Pt, so it also converts twice as much electrical energy to thermal energy."
  });

  patch("apphys2-u11-015", {
    q: "A resistor R and a resistor 2R are connected in parallel across an ideal battery of voltage V. Which comparison is correct?",
    o: [
      "Both have voltage V; the current through R is twice the current through 2R",
      "Both have voltage V; the current through 2R is twice the current through R",
      "They carry equal current; the voltage across R is twice that across 2R",
      "They carry equal current and have equal voltage because all parallel elements dissipate equal power"
    ],
    c: [0],
    e: "Parallel branches share the same potential difference V. Ohm's law gives IR=V/R and I2R=V/(2R), so the lower-resistance branch carries twice the current. Equal voltage does not imply equal current or power."
  });

  patch("apphys2-u13-011", {
    q: "Light travels through medium A with index nA=1.20 and medium B with index nB=1.80. What is the ratio vA/vB of the light speeds?",
    o: ["2/3", "1", "3/2", "9/4"],
    c: [2],
    e: "Because v=c/n, vA/vB=(c/1.20)/(c/1.80)=1.80/1.20=1.50=3/2. The higher-index medium B therefore has the lower propagation speed."
  });

  patch("apphys2-u13-015", {
    q: "An object is 30 cm in front of a converging thin lens with focal length +20 cm. Which description of the image is correct?",
    o: [
      "A real, inverted image 60 cm from the lens with magnification −2",
      "A real, upright image 12 cm from the lens with magnification +0.4",
      "A virtual, upright image 60 cm from the lens with magnification +2",
      "A virtual, inverted image 12 cm from the lens with magnification −0.4"
    ],
    c: [0],
    e: "The thin-lens equation gives 1/di=1/20−1/30=1/60, so di=+60 cm, a real image. Magnification is m=−di/do=−60/30=−2, so the image is inverted and twice the object's size."
  });

  patch("apphys2-u14-026", {
    q: "A thin film with index 1.33 lies on glass with index 1.50, with air above the film. Comparing the two rays reflected from the film's top and bottom surfaces, what is the net reflection phase-shift difference?",
    o: [
      "Zero, because each reflection is from a lower-index to a higher-index medium and each gains a 180° shift",
      "180°, because only the air-to-film reflection gains a phase shift",
      "180°, because only the film-to-glass reflection gains a phase shift",
      "360°, because the second reflected ray gains two separate 180° shifts at the lower surface"
    ],
    c: [0],
    e: "Reflection from air to film and reflection from film to glass are both low-index to high-index reflections, so each reflected ray acquires a 180° phase change at its reflecting boundary. Their reflection phase shifts therefore differ by zero; interference then depends on path difference through the film."
  });

  patch("apphys2-u14-027", {
    q: "For a thin film viewed near normal incidence, suppose the same interference order m remains constructive as film thickness increases gradually. What trend should occur in the wavelength satisfying the constructive condition?",
    o: [
      "The constructive wavelength increases because the optical path difference 2nt increases",
      "The constructive wavelength decreases because greater thickness reduces the optical path difference",
      "The constructive wavelength remains fixed because interference color is independent of film thickness",
      "No wavelength can remain constructive once the film is thicker than one visible wavelength"
    ],
    c: [0],
    e: "For a fixed interference order and fixed refractive index, the constructive condition has wavelength proportional to the optical path difference 2nt (with the appropriate reflection-phase condition). Increasing thickness therefore shifts that order toward a longer wavelength."
  });

  patch("apphys2-u15-010", {
    q: "An ideal blackbody's absolute temperature doubles. According to Wien's displacement law, how does its peak wavelength change?",
    o: ["It doubles", "It is cut in half", "It is quartered", "It remains unchanged"],
    c: [1],
    e: "Wien's displacement law states λmax T = constant. Doubling the absolute temperature therefore halves the wavelength at which the spectrum peaks, shifting the peak toward shorter wavelengths."
  });

  patch("apphys2-u15-011", {
    q: "Why does quantizing oscillator energy remove the classical ultraviolet catastrophe in the blackbody model?",
    o: [
      "High-frequency modes require larger discrete energy quanta, making them progressively harder to populate thermally",
      "Quantization makes the speed of electromagnetic waves decrease continuously as frequency increases",
      "Energy quanta force every mode to contain exactly the same total energy independent of temperature",
      "Quantization eliminates electromagnetic modes above the visible spectrum so ultraviolet radiation cannot exist"
    ],
    c: [0],
    e: "Planck's model assigns oscillator energies in discrete multiples of hf. At high frequency, each quantum costs more energy relative to kT, so high-frequency modes are much less thermally populated than classical equipartition predicts; the spectrum therefore remains finite."
  });

  patch("apphys2-u15-013", {
    q: "Two photoelectric trials use the same metal with threshold frequency f0. Trial A uses light of frequency 2f0 and intensity I; trial B uses frequency 3f0 and intensity I/2. Which comparison is correct?",
    o: [
      "Trial B gives larger maximum electron kinetic energy, while trial A can eject more electrons per second because its intensity is greater",
      "Trial A gives larger maximum kinetic energy and more electrons per second because its intensity is greater",
      "Both trials give the same maximum kinetic energy because both frequencies exceed threshold, but trial A ejects more electrons",
      "Trial B ejects more electrons per second and gives the same maximum kinetic energy because frequency changes only photon count"
    ],
    c: [0],
    e: "Kmax=hf−φ, so the higher frequency in trial B gives larger maximum kinetic energy. Intensity controls incident energy per time and, at fixed frequency, photon arrival rate; trial A's greater intensity makes a larger electron-emission rate plausible, while frequency—not intensity—sets Kmax."
  });

  patch("apphys2-u15-019", {
    q: "A binding-energy-per-nucleon curve rises steeply from hydrogen isotopes toward iron and then falls gradually for very heavy nuclei. Which statement best explains why both fusion of light nuclei and fission of very heavy nuclei can release energy?",
    o: [
      "Both processes can move nucleons toward states with greater binding energy per nucleon, so the decrease in total mass appears as released energy",
      "Fusion and fission both release energy because any change in nucleon number automatically lowers the total rest mass",
      "Fusion releases energy by moving nuclei away from iron, whereas fission releases energy by moving nuclei toward iron",
      "Both release energy only when their products have lower binding energy per nucleon than their reactants"
    ],
    c: [0],
    e: "More tightly bound nuclei have greater binding energy per nucleon and lower total mass for the same nucleon content. Fusing very light nuclei or splitting very heavy nuclei can move products toward the high-binding-energy region near iron, releasing the corresponding mass-energy difference."
  });

  // Remove stacked absolute-language tells that survived the first production pass.
  const absoluteIds = [
    "apphys2-u9-007", "apphys2-u9-014", "apphys2-u9-017", "apphys2-u10-015",
    "apphys2-u10-019", "apphys2-u10-020", "apphys2-u12-007",
  ];
  const soft = (text) => text
    .replace(/\balways\b/gi, "generally")
    .replace(/\bnever\b/gi, "typically does not")
    .replace(/\bonly\b/gi, "primarily")
    .replace(/\ball\b/gi, "the relevant")
    .replace(/\bcompletely\b/gi, "substantially")
    .replace(/\bexactly\b/gi, "approximately");
  absoluteIds.forEach((id) => {
    const q = byId.get(id);
    let retained = false;
    q.o = q.o.map((option, index) => {
      if (index === q.c[0] || !/\b(always|never|only|all|completely|exactly)\b/i.test(option)) return option;
      if (!retained) { retained = true; return option; }
      return soft(option);
    });
  });

  // Keep raw answer positions balanced. Runtime delivery shuffles independently.
  bank.forEach((item, index) => {
    const target = index % 4;
    const current = item.c[0];
    if (current === target) return;
    const correct = item.o[current];
    item.o.splice(current, 1);
    item.o.splice(target, 0, correct);
    item.c = [target];
  });
})();
