number: "001"
category: "Medical Startup"
title: "Berta Medical - Wearable ECG Platform"
subtitle: "Co-Founder & Hardware Lead · Rowan University · 2024"

domainTags:
  - KiCad
  - ESP32
  - AD8232
  - MQTT
  - AWS IoT Core
  - C++
  - SMD Assembly
  - TP4056
  - MAX1704x

summary: |
  Co-founded a medical startup to make remote cardiac monitoring accessible and affordable. Owned the full hardware stack — electrode interface, analog signal conditioning, embedded firmware, and power management — through three PCB revisions from off-the-shelf modules to an integrated wearable.

  The system centers on a single-lead-derived, 3-electrode ECG signal chain: an AD8232 instrumentation amplifier with integrated right-leg-drive reference feeds an ESP32, which samples, filters, and transmits cardiac data over TLS-encrypted MQTT to AWS IoT Core for ingestion by separate doctor and patient web portals.

specs:
  - label: "Compute"
    value: "ESP32-C3 (Dev Kit) / ESP32-C6 (Final)"
  - label: "Analog Front-End"
    value: "AD8232 single-lead ECG"
  - label: "Electrode Config"
    value: "3-lead RA / LA / LL"
  - label: "Power Management"
    value: "TP4056 + MAX1704x fuel gauge"
  - label: "Communication"
    value: "WiFi, TLS-encrypted MQTT → AWS IoT Core"
  - label: "Fabrication"
    value: "KiCad, full SMD, 3 revisions, hand-assembled"

gallery:
  - src: "Berta Medical/images/bertamedical-fig2-wearable-schematic.png"
    caption: "Final wearable schematic — AD8232 front-end, ESP32-C6, MAX1704x fuel gauge, TP1–TP9 test points via daughterboard connector"
    tall: true
  - src: "Berta Medical/images/bertamedical-pcb-copper-routing.jpg"
    caption: "ECG MainBoard MK1 copper routing — analog front-end and power sections laid out on opposite ends of the board"
  - src: "Berta Medical/images/bertamedical-fig3-devkit-render.png"
    caption: "Dev Kit PCB, 3D render — Berta Board 1.0"
    tall: true
  - src: "Berta Medical/images/bertamedical-fig3-wearable-render.png"
    caption: "Final wearable PCB, 3D render — compact two-board stack"
    tall: true
  - src: "Berta Medical/images/bertamedical-fig1-prototype-cutaway.jpg"
    caption: "Phase 1 prototype, internal cutaway — electrode ring and off-the-shelf PCB validated before custom board design"
  - src: "Berta Medical/images/bertamedical-fig3-devkit-assembly.jpg"
    caption: "Dev Kit boards during in-house assembly, alongside the Phase 1 prototype enclosure"
  - src: "Berta Medical/images/bertamedical-fig7-ecg-waveform.png"
    caption: "Oscilloscope-captured ECG waveform from the AD8232 front-end — repeatable QRS complex confirming signal-chain integrity"
    tall: true
  - src: "Berta Medical/images/bertamedical-fig7-final-wearable-assembled.jpg"
    caption: "Final wearable, fully assembled with electrode leads — configuration used for bench validation and the Rowan New Venture Competition demo"
  - src: "Berta Medical/images/bertamedical-fig6-doctor-portal.png"
    caption: "Doctor portal — multi-patient monitoring dashboard with real-time ECG viewing and AI-assisted trend analytics"
    tall: true
  - src: "Berta Medical/images/bertamedical-fig6-patient-portal.png"
    caption: "Patient portal — personal vitals dashboard, medication tracking, doctor assignments, and appointment scheduling"
    tall: true
  - src: "Berta Medical/images/bertamedical-fig8-competition-pitch.jpg"
    caption: "Presenting the Berta Medical prototype at the Rowan New Venture Competition"

challenges: |
  Biopotential acquisition at the wearable's target signal amplitude (millivolt-range cardiac electrical activity) is inherently sensitive to motion artifact and mains interference, so the AD8232's integrated instrumentation amplifier and right-leg-drive reference were used from the earliest prototype onward rather than a discrete op-amp signal chain — reducing the surface area for noise coupling before the signal reaches the microcontroller's ADC.

  Electrode-skin contact reliability was treated as a first-class design constraint: both the clip-on and chest-mount prototype variants were built to validate lead placement and adhesion strategy before any PCB was committed to, and the final wearable's daughterboard connector was specifically added to physically separate the electrode interface from the mainboard so lead routing and contact points could be iterated and validated independently at dedicated test points (TP1–TP9) without re-spinning the compute and power sections.

  The three-revision progression — prototype, Dev Kit, final wearable — was driven by the need to de-risk firmware and communications work separately from the mechanical and power constraints of a body-worn device. The Dev Kit intentionally kept the ESP32, OLED debug display, and microSD logging on a larger, breadboard-friendly board so WiFi reconnection logic and MQTT message queuing could be debugged with full visibility before committing to a compact form factor. Moving to the final wearable meant shrinking that same validated signal chain onto a two-board SMD stack, replacing the 18650 holder and basic charge circuit with a TP4056 charger paired with a MAX1704x fuel gauge for real state-of-charge reporting, and eliminating through-hole components from the signal path to keep the electrode-to-ADC trace length and parasitic loading minimal.

results:
  narrative: |
    AD8232 output was confirmed on both the prototype and final wearable PCB with an oscilloscope, with a clean QRS complex visible in the captured waveform, and independently verified via a live serial-plotter capture streamed over a COM port connection. MAX1704x fuel gauge readings were verified against known battery state, and TP4056 charge current and cutoff behavior were confirmed under bench load. On the communications side, the Dev Kit PCB validated the full MQTT path to AWS IoT Core over WiFi, including TLS handshake and certificate authentication, before that firmware was ported to the final wearable.

    The complete system — wearable hardware, cloud ingestion pipeline, and doctor/patient web portals — was live-demonstrated end to end at the Rowan New Venture Competition to an interdisciplinary panel of physicists, engineers, and business judges. This was a student prototype validated at the bench and demo level, not a clinically validated device — no accuracy, sensitivity, or regulatory claims were established at this stage.
  metrics:
    - value: "3"
      label: "PCB Revisions Shipped"
    - value: "TLS"
      label: "Encrypted MQTT Pipeline"
    - value: "2"
      label: "Web Portals (Doctor + Patient)"
    - value: "Live"
      label: "Rowan New Venture Comp Demo"

nav:
  prev:
    slug: "subaru-internship"
    title: "Subaru Technical Training Internship"
  next:
    slug: "exoskeleton"
    title: "Exoskeleton Control System"
