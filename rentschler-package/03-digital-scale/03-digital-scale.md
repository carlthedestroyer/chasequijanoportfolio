# Custom Digital Scale

*Manufacturing & Measurement Techniques · Rowan University · December 2024*

**Tags:** SolidWorks FEA · CNC Milling · Manual Lathe · Strain Gauge · Wheatstone Bridge · HX711 ADC · Arduino · GD&T · Fusion 360 · 3D Printing (ABS)

**Highlight metrics:** ±1% measurement accuracy · 0–3 kg operating range · 3.84 min. FEA safety factor · IP31 enclosure rating

---

## Overview & Objective

Engineered a complete mass-measurement instrument around a self-designed cantilever load cell — machined from 6010 aluminum billet, validated by SolidWorks static stress simulation before a single cut was made, and instrumented with a bonded strain-gauge Wheatstone bridge feeding an HX711 24-bit ADC. The project spans the full precision-mechanism stack a surgical device demands: FEA-driven structural design, manual and CNC machining to tolerance, strain-gauge bonding and signal conditioning, and closed-loop calibration against a known standard to hit a quantified accuracy spec.

## System Architecture & Technical Stack

- **Load cell:** custom cantilever-beam load cell machined from 6010 aluminum billet on a manual Bridgeport mill — facing, edge-finding, DRO-located hole drilling, hand-threading, and final pocket/exterior milling with a ¼″ end mill, all referenced off a custom fixturing jig
- **Structural validation:** SolidWorks static stress simulation run on candidate beam geometries and thicknesses prior to machining, used to confirm adequate load-path stiffness across 0–3 kg and to locate the peak-strain region for gauge placement
- **Sensing element:** foil strain gauges bonded top and bottom of the beam flexure in a Wheatstone bridge configuration, positioned at the FEA-identified peak-stress site to maximize signal-to-noise on the bridge output
- **Signal conditioning:** HX711 24-bit ADC amplifying the millivolt-scale bridge differential and delivering a digital reading to the microcontroller
- **Control & firmware:** Arduino-based firmware handling ADC polling with sample averaging, tare offset storage, unit conversion (g/kg/lb/oz), and interrupt-driven (FALLING-edge) button handling for tare and unit-swap so the UI never blocks on a read cycle
- **Enclosure fabrication:** Fusion 360-modeled clamshell shroud, 3D printed in ABS on a heated-chamber printer (10% grid infill), assembled with brass heat-set inserts throughout — no adhesive in the load path or enclosure joints — achieving an IP31 ingress rating

**Simulated sensor results (pre-machining):**

| Location | Metric | Value |
|---|---|---|
| Top strain gauge site | Average normal strain (EPSX) | +4.443 × 10⁻⁴ |
| Bottom strain gauge site | Average normal strain (EPSX) | −4.487 × 10⁻⁴ |
| Full beam, 0–3 kg load | Minimum factor of safety | **3.84** |

**Suggested images (in `Digital Scale/images/`):**
- `digitalscale-fig7-fea-stress.jpg` — SolidWorks static stress simulation on the machined load cell beam, EPSX strain distribution
- `digitalscale-fig8-sensor-table.png` — simulation sensor table listing top/bottom EPSX values and minimum factor of safety

## Engineering Challenges & Iteration

The load cell was the highest-risk component in the build because its geometry had to be committed to metal before any electrical validation was possible. Rather than machining first and instrumenting second, the beam thickness and pocket geometry were iterated entirely in SolidWorks — running static stress simulations across candidate cross-sections until the model showed the full 0–3 kg range supported with a minimum factor of safety of 3.84 (alert threshold set at 3) and clean, symmetric EPSX strain concentration at the flexure. That simulation output doubled as the machining spec and the gauge-placement map: the top and bottom faces of the same peak-stress region identified in FEA were where the strain gauges were later bonded, so the physical sensor placement matched the location the model predicted would produce the largest, most linear bridge signal.

Machining the beam to that spec on a manual Bridgeport carried its own tolerance risk — milling the center pocket with a ¼″ end mill at the wrong feed rate could thin the flexure past its design cross-section and invalidate the FEA margin entirely, so feed rate and pass depth were planned conservatively and verified in practice passes before cutting the final part. Two supporting components — a spacer block and a load tray mount — required a multi-machine workflow: the spacer was milled entirely on the Bridgeport with flatness confirmed by dial indicator, while the load tray mount was first turned to diameter on a manual lathe, then transferred via a custom jig back to the mill for side-face milling to tolerance. After machining, strain gauge installation required degreasing the bonding surfaces, applying CA-glue accelerant, and placing the gauges precisely at the simulated peak-strain sites before wiring them into the HX711 bridge amplifier — misalignment here directly degrades bridge balance and reading linearity, so gauge placement was done under magnification against the FEA strain map rather than by eye alone.

On the firmware side, closed-loop calibration against a 200 g standardized reference weight was used to derive the grams-per-ADC-count calibration factor and confirm the tare routine's multi-sample averaging held a stable zero baseline — both necessary to keep readings inside the ±1% accuracy specification across the full operating range rather than only at a single calibration point.

**Suggested images:**
- `digitalscale-fig9-technical-drawing.jpg` — load cell technical drawing used to drive the Bridgeport machining sequence
- `digitalscale-fig10-bridgeport-mill.jpg` — center pocket and exterior profile milled on a manual Bridgeport with a ¼″ end mill
- `digitalscale-fig12-manual-lathe.jpg` — load tray mount turned to diameter on a manual lathe before mill transfer
- `digitalscale-fig13-mill-transfer-jig.jpg` — custom transfer jig holding the lathe-turned mount for side-face milling to tolerance
- `digitalscale-fig11-dial-indicator.jpg` — spacer block flatness verified with a dial indicator after Bridgeport milling
- `digitalscale-fig14-strain-gauge-install.jpg` — foil strain gauge bonded at the FEA-identified peak-stress region, prior to bridge wiring

## Quantitative Results & Validation

Functional testing against a 200 g calibration standard confirmed the assembled instrument held **±1% measurement accuracy across the full 0–3 kg operating range**, with the tare routine's sample-averaging producing a repeatable zero baseline across repeated container swaps and no observed drift between unit conversions (g/kg/lb/oz computed from the same calibrated ADC reading). The load-bearing structure carried a **minimum FEA-predicted factor of safety of 3.84** against the full-range load, well above the 3.0 design threshold, and the machined part matched that predicted strain distribution closely enough that no beam geometry rework was needed after gauge installation. The 3D-printed ABS clamshell enclosure — assembled entirely with brass heat-set inserts and no adhesive — met the **IP31 ingress protection** target while remaining fully serviceable for battery access and internal component replacement.

**Suggested image:**
- `digitalscale-fig25-final-product.jpg` — completed digital scale prototype powered on, weighing a calibration standard, tray removed

---
*Note for editing: the source PDF in the project folder couldn't be read in this pass (no PDF renderer available in this environment) — everything above is sourced from the site page + resume, which fully covered the 4-part framework. If the PDF has more precise FEA stress-in-psi values or a bonding-procedure spec you want folded in, flag it and I'll re-extract it. "Auto power-off" (a resume claim) was deliberately left out since the firmware section only documents tare/unit-swap interrupts and a manual rocker switch, not auto-off logic.*
