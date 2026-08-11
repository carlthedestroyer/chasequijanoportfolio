number: "006"
category: "Manufacturing"
title: "Custom Digital Scale"
subtitle: "Manufacturing & Measurement Techniques · Rowan University · December 2024"
# repoHref: "https://github.com/you/digital-scale-firmware"   # TODO: add once a repo URL exists

domainTags:
  - SolidWorks FEA
  - CNC Milling
  - Manual Lathe
  - Strain Gauge
  - HX711 ADC
  - Arduino
  - GD&T
  - Fusion 360

summary: |
  Engineered a complete mass-measurement instrument around a self-designed cantilever load cell — machined from 6010 aluminum billet, validated by SolidWorks static stress simulation before a single cut was made, and instrumented with a bonded strain-gauge Wheatstone bridge feeding an HX711 24-bit ADC. The project spans the full precision-mechanism stack a surgical device demands: FEA-driven structural design, manual and CNC machining to tolerance, strain-gauge bonding and signal conditioning, and closed-loop calibration against a known standard to hit a quantified accuracy spec.

  The load cell was machined on a manual Bridgeport mill — facing, edge-finding, DRO-located hole drilling, hand-threading, and final pocket/exterior milling with a 1/4" end mill, all referenced off a custom fixturing jig. Foil strain gauges bonded top and bottom of the beam flexure in a Wheatstone bridge configuration feed an HX711 24-bit ADC, and Arduino-based firmware handles ADC polling with sample averaging, tare offset storage, unit conversion (g/kg/lb/oz), and interrupt-driven button handling for tare and unit-swap, all housed in a Fusion 360-modeled, 3D-printed ABS clamshell enclosure.

specs:
  - label: "Load Cell"
    value: "Cantilever beam, 6010 aluminum, CNC/manual machined"
  - label: "Sensing"
    value: "Foil strain gauge, Wheatstone bridge"
  - label: "ADC"
    value: "HX711, 24-bit"
  - label: "Firmware"
    value: "Arduino, interrupt-driven tare/unit-swap"
  - label: "Enclosure"
    value: "Fusion 360, 3D-printed ABS, heat-set inserts"
  - label: "Ingress Rating"
    value: "IP31"
  - label: "Accuracy"
    value: "±1%, 0–3 kg range"

demoVideo:
  src: "Digital Scale/videos/demo.mp4"
  poster: "Digital Scale/images/digitalscale-fig25-final-product.jpg"
  caption: "Powering on, taring, and weighing a calibration standard, then swapping units live (g/kg/lb/oz)."

gallery:
  - src: "Digital Scale/images/digitalscale-fig7-fea-stress.jpg"
    caption: "SolidWorks static stress simulation on the machined load cell beam, showing EPSX strain distribution across the 0–3 kg range"
    tall: true
  - src: "Digital Scale/images/digitalscale-fig8-sensor-table.png"
    caption: "Simulation sensor table listing top and bottom EPSX strain values at the gauge sites and the minimum factor of safety"
    tall: true
  - src: "Digital Scale/images/digitalscale-fig9-technical-drawing.jpg"
    caption: "Load cell technical drawing used to drive the Bridgeport machining sequence"
    tall: true
  - src: "Digital Scale/images/digitalscale-fig10-bridgeport-mill.jpg"
    caption: "Center pocket and exterior profile milled on a manual Bridgeport with a 1/4\" end mill"
  - src: "Digital Scale/images/digitalscale-fig12-manual-lathe.jpg"
    caption: "Load tray mount turned to diameter on a manual lathe before mill transfer"
  - src: "Digital Scale/images/digitalscale-fig13-mill-transfer-jig.jpg"
    caption: "Custom transfer jig holding the lathe-turned mount for side-face milling to tolerance"
  - src: "Digital Scale/images/digitalscale-fig11-dial-indicator.jpg"
    caption: "Spacer block flatness verified with a dial indicator after Bridgeport milling"
  - src: "Digital Scale/images/digitalscale-fig14-strain-gauge-install.jpg"
    caption: "Foil strain gauge bonded at the FEA-identified peak-stress region, prior to bridge wiring"
  - src: "Digital Scale/images/digitalscale-signal-chain-schematic.jpg"
    caption: "Signal-chain schematic — strain-gauge Wheatstone bridge → HX711 24-bit ADC → Arduino"
    tall: true
  - src: "Digital Scale/images/digitalscale-fig25-final-product.jpg"
    caption: "Completed digital scale prototype powered on, weighing a calibration standard, tray removed"

model3d:
  src: "Digital Scale/FINAL_SCALE.glb"
  poster: "Digital Scale/images/digitalscale-fig9-technical-drawing.jpg"
  caption: "Machined cantilever load cell and tray-mount assembly — drag to rotate."

challenges: |
  The load cell was the highest-risk component in the build because its geometry had to be committed to metal before any electrical validation was possible. Rather than machining first and instrumenting second, the beam thickness and pocket geometry were iterated entirely in SolidWorks — running static stress simulations across candidate cross-sections until the model showed the full 0–3 kg range supported with a minimum factor of safety of 3.84 (alert threshold set at 3) and clean, symmetric EPSX strain concentration at the flexure. That simulation output doubled as the machining spec and the gauge-placement map: the top and bottom faces of the same peak-stress region identified in FEA were where the strain gauges were later bonded.

  Machining the beam to that spec on a manual Bridgeport carried its own tolerance risk — milling the center pocket with a 1/4" end mill at the wrong feed rate could thin the flexure past its design cross-section and invalidate the FEA margin entirely, so feed rate and pass depth were planned conservatively and verified in practice passes before cutting the final part. Two supporting components — a spacer block and a load tray mount — required a multi-machine workflow: the spacer was milled entirely on the Bridgeport with flatness confirmed by dial indicator, while the load tray mount was first turned to diameter on a manual lathe, then transferred via a custom jig back to the mill for side-face milling to tolerance. After machining, strain gauge installation required degreasing the bonding surfaces, applying CA-glue accelerant, and placing the gauges precisely at the simulated peak-strain sites before wiring them into the HX711 bridge amplifier — misalignment here directly degrades bridge balance and reading linearity, so gauge placement was done under magnification against the FEA strain map.

  On the firmware side, closed-loop calibration against a 200 g standardized reference weight was used to derive the grams-per-ADC-count calibration factor and confirm the tare routine's multi-sample averaging held a stable zero baseline — both necessary to keep readings inside the ±1% accuracy specification across the full operating range.

results:
  narrative: |
    Functional testing against a 200 g calibration standard confirmed the assembled instrument held ±1% measurement accuracy across the full 0–3 kg operating range, with the tare routine's sample-averaging producing a repeatable zero baseline across repeated container swaps and no observed drift between unit conversions (g/kg/lb/oz computed from the same calibrated ADC reading). The load-bearing structure carried a minimum FEA-predicted factor of safety of 3.84 against the full-range load, well above the 3.0 design threshold, and the machined part matched that predicted strain distribution closely enough that no beam geometry rework was needed after gauge installation.

    The 3D-printed ABS clamshell enclosure — assembled entirely with brass heat-set inserts and no adhesive — met the IP31 ingress protection target while remaining fully serviceable for battery access and internal component replacement.
  metrics:
    - value: "±1%"
      label: "Measurement Accuracy"
    - value: "0–3 kg"
      label: "Operating Range"
    - value: "3.84"
      label: "Min. FEA Safety Factor"
    - value: "IP31"
      label: "Enclosure Rating"

nav:
  prev:
    slug: "same-rowan-chapter"
    title: "Search-and-Rescue UAV — SAME Rowan Grant Program"
  next:
    slug: "ros-robot"
    title: "ROS Robot — Mobile Perception Platform"
