function depthScaleForPosition(roomPosition) {
  return 0.92 + roomPosition.y / 420
}

function labelPlacementForProject(project) {
  return project.labelPlacement ?? 'top'
}

function displayPositionForProject(project) {
  return project.displayPosition ?? project.roomPosition
}

export default function PixelRoom({ activeId, nearbyId, onHover, onSelect, playerPosition, projects, selectedId }) {
  return (
    <div
      className="pixel-room-shell"
      onClick={() => {
        onHover(null)
      }}
    >
      <svg
        aria-hidden="true"
        className="pixel-room-art"
        shapeRendering="geometricPrecision"
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shell-outer" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#8a9db4" />
            <stop offset="100%" stopColor="#788ba2" />
          </linearGradient>
          <linearGradient id="left-wall" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f6f7" />
            <stop offset="100%" stopColor="#d7dadd" />
          </linearGradient>
          <linearGradient id="back-wall" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f2f4f6" />
            <stop offset="100%" stopColor="#d6dbe1" />
          </linearGradient>
          <linearGradient id="led-strip" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#e6eeff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#f3e8ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#dce8ff" stopOpacity="0.48" />
          </linearGradient>
          <linearGradient id="floor-main" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#6f737d" />
            <stop offset="100%" stopColor="#50555e" />
          </linearGradient>
          <linearGradient id="glass-soft" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f8ffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#cfe5df" stopOpacity="0.26" />
          </linearGradient>
          <linearGradient id="cabinet-frame" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f7f8fa" />
            <stop offset="100%" stopColor="#d9e0ea" />
          </linearGradient>
          <linearGradient id="cabinet-side" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#d5dde8" />
            <stop offset="100%" stopColor="#bcc7d7" />
          </linearGradient>
          <linearGradient id="drawer-dark" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#474c57" />
            <stop offset="100%" stopColor="#252a32" />
          </linearGradient>
          <linearGradient id="desk-side" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f7f8fb" />
            <stop offset="100%" stopColor="#d8e1eb" />
          </linearGradient>
          <radialGradient id="night-lamp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4b6f0" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#f4b6f0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="desk-screen-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#aac7ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#aac7ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="terrarium-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d7f4e7" stopOpacity="0.54" />
            <stop offset="100%" stopColor="#d7f4e7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* RoomShell */}
        <polygon fill="url(#shell-outer)" points="112,160 596,24 1094,220 610,360" />
        <polygon fill="#c7d0dc" points="112,160 610,360 610,818 112,612" />
        <polygon fill="#b4becd" points="610,360 1094,220 1094,668 610,818" />
        <polygon fill="url(#left-wall)" points="154,184 610,370 610,782 154,594" />
        <polygon fill="url(#back-wall)" points="610,370 1052,246 1052,634 610,782" />
        <polygon fill="#fcfcfd" opacity="0.8" points="174,180 594,63 1028,234 610,352" />
        <polygon fill="#c9d1dc" opacity="0.46" points="596,83 622,91 622,768 596,756" />
        <polygon fill="#b3bcc8" opacity="0.2" points="184,564 610,740 610,782 154,594" />
        <polygon fill="#b5bfcb" opacity="0.18" points="610,740 1010,628 1052,634 610,782" />
        <polyline
          fill="none"
          opacity="0.9"
          points="180,198 594,84 1007,245"
          stroke="url(#led-strip)"
          strokeLinecap="round"
          strokeWidth="11"
        />
        <polyline
          fill="none"
          opacity="0.56"
          points="180,206 594,91 1004,252"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <polyline
          fill="none"
          opacity="0.18"
          points="182,201 594,86 1006,247"
          stroke="#f5f2ff"
          strokeLinecap="round"
          strokeWidth="18"
        />
        <polygon fill="#eef2f6" opacity="0.95" points="166,576 610,757 610,768 154,594" />
        <polygon fill="#eef2f6" opacity="0.92" points="610,757 1052,628 1052,616 610,746" />
        <polygon fill="#d8dfe8" points="112,612 610,818 610,876 112,670" />
        <polygon fill="#adb8c8" points="610,818 1094,668 1094,728 610,876" />

        {/* Floor */}
        <polygon fill="url(#floor-main)" points="216,572 676,434 987,560 528,707" />
        <polygon fill="#696d76" points="250,580 368,545 446,576 328,612" />
        <polygon fill="#61656e" points="370,544 488,509 566,540 448,576" />
        <polygon fill="#696d76" points="490,508 608,473 686,504 568,539" />
        <polygon fill="#61656e" points="610,472 728,437 806,468 688,503" />
        <polygon fill="#696d76" points="296,620 414,585 492,616 374,652" />
        <polygon fill="#61656e" points="416,584 534,549 612,580 494,616" />
        <polygon fill="#696d76" points="536,548 654,513 732,544 614,580" />
        <polygon fill="#61656e" points="656,512 774,477 852,508 734,544" />
        <polygon fill="#696d76" points="342,660 460,625 538,656 420,692" />
        <polygon fill="#61656e" points="462,624 580,589 658,620 540,656" />
        <polygon fill="#696d76" points="582,588 700,553 778,584 660,620" />
        <g opacity="0.18" stroke="#aeb5be" strokeWidth="4">
          <line x1="278" x2="774" y1="595" y2="450" />
          <line x1="262" x2="758" y1="629" y2="486" />
          <line x1="246" x2="742" y1="665" y2="522" />
        </g>
        <g opacity="0.16" stroke="#c0c7cf" strokeWidth="2.5">
          <line x1="300" x2="788" y1="560" y2="706" />
          <line x1="364" x2="851" y1="541" y2="688" />
          <line x1="430" x2="919" y1="520" y2="667" />
          <line x1="495" x2="980" y1="501" y2="648" />
          <line x1="338" x2="427" y1="554" y2="694" />
          <line x1="458" x2="547" y1="518" y2="659" />
          <line x1="580" x2="668" y1="482" y2="623" />
          <line x1="702" x2="792" y1="446" y2="587" />
          <line x1="823" x2="914" y1="482" y2="623" />
        </g>
        <g opacity="0.11" stroke="#a5adb7" strokeWidth="1.5">
          <line x1="260" x2="740" y1="612" y2="468" />
          <line x1="282" x2="762" y1="628" y2="484" />
          <line x1="324" x2="804" y1="661" y2="516" />
          <line x1="346" x2="826" y1="678" y2="533" />
        </g>
        <ellipse cx="286" cy="626" fill="#2c3139" opacity="0.18" rx="92" ry="24" />
        <ellipse cx="640" cy="622" fill="#2a3038" opacity="0.13" rx="78" ry="18" />
        <ellipse cx="760" cy="620" fill="#2b3039" opacity="0.11" rx="52" ry="14" />
        <ellipse cx="924" cy="666" fill="#2b3039" opacity="0.14" rx="92" ry="18" />
        <ellipse cx="926" cy="705" fill="#242931" opacity="0.16" rx="42" ry="12" />

        {/* BedArea */}
        <g transform="translate(8 102) scale(0.86)">
          <polygon fill="#b8c1ce" points="142,548 302,460 490,538 330,629" />
          <polygon fill="#eceff4" points="142,482 302,394 490,472 330,563" />
          <polygon fill="#50535b" points="146,482 332,563 332,700 146,620" />
          <polygon fill="#30333a" points="332,563 490,472 490,610 332,700" />
          <path
            d="M170 516 L286 462 L428 519 Q465 538 450 568 L344 629 Q324 645 292 635 L170 582 Q145 568 154 546 Z"
            fill="#474a52"
          />
          <path
            d="M190 520 Q223 510 246 522 Q272 534 290 547 Q318 567 337 596"
            fill="none"
            opacity="0.32"
            stroke="#7f8288"
            strokeWidth="4"
          />
          <path
            d="M236 500 Q260 492 286 505 Q310 517 336 537"
            fill="none"
            opacity="0.28"
            stroke="#7f8288"
            strokeWidth="4"
          />
          <path
            d="M287 485 Q317 477 344 489 Q372 502 398 522"
            fill="none"
            opacity="0.26"
            stroke="#7f8288"
            strokeWidth="4"
          />
          <polygon fill="#5e6168" points="183,457 248,426 320,456 254,490" />
          <polygon fill="#4e5158" points="250,447 322,418 385,444 313,474" />
          <polygon fill="#2b2f37" points="190,450 270,419 350,449 271,482" />
          <polygon fill="#0e1015" points="210,467 249,454 296,470 258,485" />
          <path
            d="M178 534 Q224 520 264 534 Q305 549 336 575 Q360 597 366 617"
            fill="none"
            opacity="0.2"
            stroke="#191c22"
            strokeWidth="10"
          />
          <line opacity="0.62" stroke="#f6f6f6" strokeWidth="4" x1="226" x2="288" y1="468" y2="490" />
          <path
            d="M182 518 Q208 498 246 508 Q286 519 322 545 Q352 566 368 592"
            fill="none"
            opacity="0.28"
            stroke="#9ea3aa"
            strokeWidth="6"
          />
          <path
            d="M246 534 Q280 520 310 530 Q343 541 374 565"
            fill="none"
            opacity="0.18"
            stroke="#c5c8cf"
            strokeWidth="5"
          />
          <path
            d="M224 590 Q268 578 304 592 Q333 603 354 620"
            fill="none"
            opacity="0.22"
            stroke="#a7adb6"
            strokeWidth="4.5"
          />
          <polygon fill="#ffffff" opacity="0.78" points="192,575 300,620 300,681 192,637" />
          <polygon fill="#5a5f68" opacity="0.18" points="160,603 326,672 326,690 160,621" />
          <polygon fill="#f5f6f9" opacity="0.2" points="144,482 302,394 344,412 186,500" />
        </g>

        {/* NightstandArea */}
        <g transform="translate(18 102) scale(0.82)">
          <polygon fill="#dde3ec" points="228,534 302,494 362,519 287,561" />
          <polygon fill="#242933" points="228,494 302,454 362,479 287,521" />
          <polygon fill="#484c55" points="228,494 287,521 287,561 228,534" />
          <polygon fill="#343841" points="287,521 362,479 362,519 287,561" />
          <rect fill="url(#night-lamp-glow)" height="140" opacity="0.9" width="140" x="166" y="442" />
          <circle cx="248" cy="503" fill="#f3eef9" r="17" />
          <path
            d="M248 484 C256 494, 256 509, 248 519 C240 509, 240 494, 248 484 Z"
            fill="#d887e5"
          />
          <rect fill="#10131b" height="30" rx="5" width="16" x="239" y="519" />
          <rect fill="#f0d254" height="11" rx="3" width="26" x="276" y="505" />
          <rect fill="#20242c" height="18" rx="5" width="12" x="213" y="516" />
        </g>

        {/* WallArtGroup */}
        <g>
          <polygon fill="#323a45" points="238,233 320,210 334,218 252,241" />
          <polygon fill="#252d36" points="320,210 334,218 334,339 320,331" />
          <rect fill="#2a313b" height="118" rx="6" width="88" x="238" y="233" />
          <rect fill="#ffffff" height="96" opacity="0.94" width="72" x="246" y="241" />
          <polygon fill="#d2e1e2" points="262,255 291,243 309,262 284,275" />
          <polygon fill="#e4caa2" points="280,277 312,263 320,281 292,297" />
          <polygon fill="#403d3c" points="292,300 320,288 333,309 305,322" />
          <line opacity="0.46" stroke="#ffffff" strokeWidth="3" x1="248" x2="312" y1="248" y2="230" />

          <polygon fill="#323a45" points="255,373 337,350 350,358 268,381" />
          <polygon fill="#252d36" points="337,350 350,358 350,479 337,471" />
          <rect fill="#2a313b" height="118" rx="6" width="88" x="255" y="373" />
          <rect fill="#ffffff" height="96" opacity="0.96" width="72" x="263" y="381" />
          <polygon fill="#d9d5f2" points="281,394 311,380 334,397 304,412" />
          <polygon fill="#f3dfbf" points="301,417 325,405 348,423 318,437" />
          <polygon fill="#b7cad8" points="290,442 320,429 340,448 308,462" />
          <line opacity="0.46" stroke="#ffffff" strokeWidth="3" x1="266" x2="329" y1="388" y2="369" />
        </g>

        {/* WindowArea */}
        <g>
          <polygon fill="#edf1f7" points="324,273 384,260 384,428 324,441" />
          <polygon fill="#d2dae7" points="384,260 432,288 432,416 384,428" />
          <polygon fill="#a7b5c9" points="316,264 384,247 439,279 369,294" />
          <rect fill="#c9d4df" height="126" width="48" x="334" y="288" />
          <rect fill="#8ca0af" height="118" opacity="0.48" width="38" x="339" y="293" />
          <circle cx="352" cy="326" fill="#5f8568" opacity="0.44" r="15" />
          <circle cx="360" cy="350" fill="#809a76" opacity="0.38" r="10" />
          <rect fill="#98a6b7" height="110" width="6" x="384" y="306" />

          <polygon fill="#f7f8fb" points="274,509 330,488 357,499 300,522" />
          <polygon fill="#dce4ee" points="274,509 300,522 300,554 274,543" />
          <polygon fill="#b8c3d3" points="300,522 357,499 357,531 300,554" />
          <rect fill="#ffffff" height="52" opacity="0.86" width="58" x="309" y="508" />
          <line opacity="0.62" stroke="#d5dbe5" strokeWidth="4" x1="315" x2="315" y1="512" y2="556" />
          <line opacity="0.62" stroke="#d5dbe5" strokeWidth="4" x1="326" x2="326" y1="512" y2="556" />
          <line opacity="0.62" stroke="#d5dbe5" strokeWidth="4" x1="337" x2="337" y1="512" y2="556" />
          <line opacity="0.62" stroke="#d5dbe5" strokeWidth="4" x1="348" x2="348" y1="512" y2="556" />

          <circle cx="370" cy="414" fill="#3d7f46" r="20" />
          <circle cx="396" cy="392" fill="#7db75b" r="18" />
          <rect fill="#bb723f" height="18" rx="8" width="44" x="352" y="425" />
          <circle cx="430" cy="385" fill="#86c381" r="18" />
          <rect fill="#8b5a44" height="16" rx="7" width="28" x="416" y="401" />
          <path
            d="M428 387 C432 370, 442 358, 451 350 C458 345, 464 345, 468 352"
            fill="none"
            stroke="#b76893"
            strokeWidth="3"
          />
          <circle cx="452" cy="349" fill="#dd83be" r="5" />
          <circle cx="460" cy="354" fill="#dd83be" r="4" />
        </g>

        {/* TerrariumCabinetArea */}
        <g transform="translate(130 18) scale(0.84)">
          <polygon fill="#2a2f39" opacity="0.12" points="540,612 668,600 760,630 628,645" />
          <polygon fill="url(#cabinet-frame)" points="528,298 676,286 676,590 528,604" />
          <polygon fill="url(#cabinet-side)" points="676,286 808,365 808,566 676,590" />
          <polygon fill="#bdc7d5" points="528,298 676,286 808,365 664,379" />
          <polygon fill="#ffffff" opacity="0.24" points="540,311 669,300 786,367 656,380" />
          <rect fill="#d4dce8" height="252" opacity="0.72" width="10" x="544" y="346" />
          <rect fill="#aab3bf" height="72" opacity="0.2" rx="10" width="110" x="546" y="348" />
          <rect fill="#edf1f5" height="76" rx="8" width="110" x="546" y="344" />
          <rect fill="url(#glass-soft)" height="64" rx="6" width="98" x="552" y="350" />
          <rect fill="url(#terrarium-glow)" height="68" rx="6" width="102" x="550" y="348" />
          <rect fill="#68717a" height="60" opacity="0.12" rx="6" width="94" x="556" y="356" />
          <rect fill="#eef3e5" height="6" opacity="0.92" width="92" x="555" y="354" />
          <rect fill="#e1d2ad" height="14" opacity="0.96" width="94" x="554" y="350" />
          <ellipse cx="581" cy="398" fill="#8a8b82" rx="16" ry="9" />
          <ellipse cx="611" cy="390" fill="#6d736c" rx="18" ry="10" />
          <ellipse cx="632" cy="401" fill="#94988a" rx="10" ry="6" />
          <path d="M563 396 Q577 375 589 390 Q601 404 620 388 Q632 376 642 392" fill="none" stroke="#71a976" strokeWidth="6" />
          <path d="M574 406 Q586 387 600 403 Q614 420 634 400" fill="none" opacity="0.7" stroke="#b6d4bd" strokeWidth="4" />
          <path d="M585 402 Q598 380 609 392 Q620 404 630 384" fill="none" opacity="0.75" stroke="#4d8f59" strokeWidth="4" />
          <path d="M565 364 L596 354" fill="none" opacity="0.34" stroke="#ffffff" strokeWidth="5" />
          <path d="M608 410 L635 356" fill="none" opacity="0.24" stroke="#ffffff" strokeWidth="5" />
          <rect fill="#ffffff" height="52" opacity="0.18" width="6" x="561" y="358" />
          <rect fill="#ffffff" height="52" opacity="0.1" width="4" x="638" y="360" />

          <rect fill="#aab3bf" height="78" opacity="0.2" rx="10" width="110" x="546" y="434" />
          <rect fill="#edf1f5" height="84" rx="8" width="110" x="546" y="432" />
          <rect fill="url(#glass-soft)" height="72" rx="6" width="98" x="552" y="438" />
          <rect fill="url(#terrarium-glow)" height="78" rx="6" width="102" x="550" y="434" />
          <rect fill="#677079" height="68" opacity="0.12" rx="6" width="94" x="556" y="440" />
          <rect fill="#e2cda2" height="18" opacity="0.96" width="94" x="554" y="438" />
          <ellipse cx="579" cy="490" fill="#7e847a" rx="12" ry="7" />
          <ellipse cx="608" cy="500" fill="#8d8f86" rx="18" ry="10" />
          <ellipse cx="631" cy="484" fill="#6b726a" rx="13" ry="7" />
          <path d="M566 486 Q579 466 590 484 Q602 503 618 486 Q629 474 640 489" fill="none" stroke="#5c9d6c" strokeWidth="6" />
          <path d="M574 505 Q588 490 599 506 Q612 523 632 505" fill="none" opacity="0.72" stroke="#9fcab0" strokeWidth="4" />
          <path d="M580 500 Q595 472 611 489 Q627 507 639 486" fill="none" opacity="0.74" stroke="#3f8654" strokeWidth="4" />
          <path d="M560 472 L603 444" fill="none" opacity="0.22" stroke="#ffffff" strokeWidth="6" />
          <path d="M606 510 L646 454" fill="none" opacity="0.2" stroke="#ffffff" strokeWidth="6" />
          <rect fill="#ffffff" height="60" opacity="0.18" width="6" x="560" y="444" />
          <rect fill="#ffffff" height="60" opacity="0.08" width="4" x="638" y="446" />

          <rect fill="#aab3bf" height="54" opacity="0.2" rx="10" width="110" x="546" y="526" />
          <rect fill="#edf1f5" height="58" rx="8" width="110" x="546" y="524" />
          <rect fill="url(#glass-soft)" height="46" rx="6" width="98" x="552" y="530" />
          <rect fill="url(#terrarium-glow)" height="52" rx="6" width="102" x="550" y="526" />
          <rect fill="#697179" height="40" opacity="0.11" rx="6" width="94" x="556" y="534" />
          <rect fill="#e7deca" height="14" opacity="0.92" width="94" x="554" y="530" />
          <ellipse cx="576" cy="556" fill="#8e9287" rx="12" ry="7" />
          <ellipse cx="603" cy="563" fill="#7c857a" rx="18" ry="9" />
          <path d="M572 564 Q585 544 600 560 Q612 575 628 555 Q638 545 643 553" fill="none" stroke="#6cac79" strokeWidth="5" />
          <path d="M563 546 L592 534" fill="none" opacity="0.24" stroke="#ffffff" strokeWidth="5" />
          <path d="M607 574 L635 540" fill="none" opacity="0.16" stroke="#ffffff" strokeWidth="5" />
          <rect fill="#ffffff" height="38" opacity="0.16" width="5" x="561" y="534" />

          <rect fill="url(#drawer-dark)" height="72" rx="12" width="112" x="544" y="594" />
          <line opacity="0.22" stroke="#f5f7fb" strokeWidth="2" x1="548" x2="652" y1="626" y2="626" />
          <circle cx="570" cy="630" fill="#eef3f6" r="4" />
          <circle cx="631" cy="630" fill="#eef3f6" r="4" />
        </g>

        {/* NarrowDisplayCabinetArea + BuddhaStatue */}
        <g transform="translate(130 18) scale(0.84)">
          <polygon fill="#2b303a" opacity="0.1" points="705,640 771,676 834,658 768,620" />
          <polygon fill="url(#cabinet-frame)" points="694,314 776,360 776,676 694,630" />
          <polygon fill="url(#cabinet-side)" points="776,360 842,350 842,664 776,676" />
          <polygon fill="#bfcbdb" points="694,314 776,360 842,350 758,305" />
          <polygon fill="#ffffff" opacity="0.22" points="705,322 774,362 831,353 759,314" />
          <rect fill="#eff3ef" height="78" rx="7" width="54" x="703" y="330" />
          <rect fill="#e3c99c" height="18" opacity="0.94" width="44" x="708" y="334" />
          <rect fill="url(#glass-soft)" height="58" rx="6" width="44" x="708" y="344" />
          <rect fill="#5f676f" height="50" opacity="0.12" rx="5" width="38" x="711" y="350" />
          <ellipse cx="725" cy="382" fill="#8b7e6d" rx="10" ry="6" />
          <path d="M713 391 Q721 372 731 389 Q740 405 747 390" fill="none" stroke="#7ead72" strokeWidth="4" />
          <path d="M714 356 L732 348" fill="none" opacity="0.24" stroke="#ffffff" strokeWidth="4" />
          <rect fill="#ffffff" height="46" opacity="0.18" width="4" x="714" y="348" />
          <rect fill="url(#drawer-dark)" height="68" rx="10" width="60" x="701" y="418" />
          <rect fill="url(#drawer-dark)" height="68" rx="10" width="60" x="701" y="498" />
          <rect fill="url(#drawer-dark)" height="68" rx="10" width="60" x="701" y="578" />
          <line opacity="0.22" stroke="#f5f7fb" strokeWidth="2" x1="706" x2="756" y1="450" y2="450" />
          <line opacity="0.22" stroke="#f5f7fb" strokeWidth="2" x1="706" x2="756" y1="530" y2="530" />
          <line opacity="0.22" stroke="#f5f7fb" strokeWidth="2" x1="706" x2="756" y1="610" y2="610" />
          <circle cx="731" cy="451" fill="#eef1f5" r="4" />
          <circle cx="731" cy="531" fill="#eef1f5" r="4" />
          <circle cx="731" cy="611" fill="#eef1f5" r="4" />
          <ellipse cx="790" cy="286" fill="#eadfbe" rx="23" ry="18" />
          <path d="M790 250 C777 259, 777 279, 790 287 C804 279, 804 259, 790 250 Z" fill="#faf2da" />
          <ellipse cx="790" cy="298" fill="#d9cda7" rx="10" ry="6" />
        </g>

        {/* BookshelfArea */}
        <g transform="translate(130 18) scale(0.84)">
          <polygon fill="#2a2f39" opacity="0.08" points="774,602 838,592 878,612 814,622" />
          <rect fill="#f4f6fa" height="250" width="72" x="768" y="344" />
          <rect fill="#dbe2ec" height="250" width="14" x="838" y="344" />
          <rect fill="#ffffff" height="250" opacity="0.18" width="5" x="774" y="344" />
          <rect fill="#c3cedc" height="12" width="82" x="764" y="344" />
          <rect fill="#c3cedc" height="12" width="82" x="764" y="408" />
          <rect fill="#c3cedc" height="12" width="82" x="764" y="474" />
          <rect fill="#c3cedc" height="12" width="82" x="764" y="540" />
          <rect fill="#f8fafc" height="8" opacity="0.54" width="58" x="776" y="348" />
          <rect fill="#7d79c2" height="42" width="10" x="779" y="356" />
          <rect fill="#d8b468" height="40" width="10" x="792" y="358" />
          <rect fill="#6ea0c5" height="46" width="10" x="805" y="352" />
          <rect fill="#be6755" height="36" width="10" x="818" y="362" />
          <rect fill="#23262f" height="10" width="44" x="776" y="428" />
          <rect fill="#814d42" height="14" rx="7" width="22" x="798" y="446" />
          <rect fill="#f6f5f2" height="14" width="30" x="780" y="500" />
          <rect fill="#23262f" height="36" width="12" x="780" y="520" />
          <rect fill="#373c46" height="40" width="12" x="795" y="516" />
          <rect fill="#1d2129" height="46" width="12" x="810" y="510" />
          <rect fill="#f0f1f4" height="28" width="30" x="780" y="568" />
          <rect fill="#23262f" height="44" width="10" x="780" y="608" />
          <rect fill="#3c404a" height="46" width="10" x="793" y="606" />
          <rect fill="#1d2129" height="52" width="10" x="806" y="600" />
        </g>

        {/* DeskArea + OfficeChair + RoundGlassTerrarium */}
        <g transform="translate(188 32) scale(0.8)">
          <ellipse cx="926" cy="714" fill="#252a32" opacity="0.16" rx="98" ry="16" />
          <ellipse cx="1062" cy="624" fill="#252a32" opacity="0.1" rx="42" ry="10" />
          <polygon fill="#f8f9fb" points="768,564 930,536 1010,570 848,598" />
          <polygon fill="url(#desk-side)" points="768,564 848,598 848,718 768,683" />
          <polygon fill="#eef3f7" points="848,598 1010,570 1010,684 848,718" />
          <polygon fill="#f2f6fa" points="968,565 1094,545 1122,560 996,580" />
          <polygon fill="#d2dbe8" points="996,580 1122,560 1122,720 996,738" />
          <polygon fill="#bcc7d7" points="968,565 996,580 996,738 968,721" />
          <path
            d="M770 565 C803 556, 836 555, 862 564 L848 598 L770 565 Z"
            fill="#ffffff"
            opacity="0.48"
          />
          <polygon fill="#ffffff" opacity="0.18" points="781,571 847,599 847,705 781,678" />
          <polygon fill="#d4dde7" opacity="0.64" points="968,565 1094,545 1108,553 982,573" />
          <rect fill="url(#desk-screen-glow)" height="138" width="196" x="754" y="486" />
          <polygon fill="#edf1f6" points="822,536 934,516 972,534 861,554" />
          <polygon fill="#2a313c" points="804,518 924,497 975,526 856,547" />
          <polygon fill="#547095" points="823,531 890,520 934,539 866,551" />
          <polygon fill="#6d88ac" opacity="0.72" points="879,524 930,515 960,529 909,538" />
          <line opacity="0.24" stroke="#ffffff" strokeWidth="4" x1="820" x2="946" y1="520" y2="497" />
          <polygon fill="#e9edf2" points="848,560 920,548 948,560 876,572" />
          <rect fill="#616977" height="46" rx="12" width="22" x="883" y="568" />
          <polygon fill="#eef1f5" points="840,598 918,585 940,594 860,607" />
          <path d="M868 552 L845 514" fill="none" stroke="#e9edf5" strokeLinecap="round" strokeWidth="7" />
          <circle cx="842" cy="512" fill="#f5f6f9" r="13" />
          <rect fill="#c8d3dd" height="16" rx="5" width="40" x="790" y="548" />
          <polygon fill="#d0a669" points="886,540 900,537 910,562 896,565" />
          <polygon fill="#5b96be" points="902,540 914,538 924,562 912,564" />
          <polygon fill="#74b876" points="918,535 930,533 940,563 928,565" />
          <polygon fill="#d8dde4" points="1006,632 1042,625 1055,632 1019,639" />

          <circle cx="1064" cy="594" fill="#d2e6d8" r="40" />
          <circle cx="1064" cy="594" fill="none" opacity="0.68" r="34" stroke="#ffffff" strokeWidth="6" />
          <circle cx="1058" cy="588" fill="#ffffff" opacity="0.18" r="28" />
          <ellipse cx="1058" cy="610" fill="#dfe4e6" rx="15" ry="7" />
          <ellipse cx="1073" cy="600" fill="#7b7f77" rx="11" ry="6" />
          <path d="M1046 598 Q1053 583 1064 595 Q1073 607 1084 588" fill="none" stroke="#7db385" strokeWidth="5" />

          <path d="M907 626 L887 664" fill="none" opacity="0.8" stroke="#555d69" strokeWidth="8" />
          <path d="M921 626 L941 664" fill="none" opacity="0.8" stroke="#555d69" strokeWidth="8" />
          <rect fill="#1f242d" height="74" rx="28" width="56" x="889" y="588" />
          <rect fill="#3c4450" height="56" opacity="0.72" rx="18" width="42" x="896" y="597" />
          <path d="M885 676 Q907 666 925 670 Q942 674 958 688 L949 699 Q930 688 905 690 Q891 691 878 698 Z" fill="#2b3038" />
          <path d="M882 631 L868 646" fill="none" opacity="0.74" stroke="#6b727e" strokeWidth="6" />
          <path d="M944 632 L957 646" fill="none" opacity="0.74" stroke="#6b727e" strokeWidth="6" />
          <path d="M912 676 L886 706" fill="none" opacity="0.74" stroke="#555d69" strokeWidth="7" />
          <path d="M912 676 L920 714" fill="none" opacity="0.74" stroke="#555d69" strokeWidth="7" />
          <path d="M912 676 L950 688" fill="none" opacity="0.74" stroke="#555d69" strokeWidth="7" />
          <circle cx="881" cy="709" fill="#505663" r="8" />
          <circle cx="918" cy="721" fill="#505663" r="8" />
          <circle cx="954" cy="691" fill="#505663" r="8" />
          <circle cx="891" cy="690" fill="#505663" r="8" />
          <circle cx="939" cy="684" fill="#505663" r="8" />
        </g>

        {/* GalleryWall */}
        <g transform="translate(116 10) scale(0.86)">
          <polygon fill="#313842" points="808,255 856,241 856,310 808,324" />
          <polygon fill="#f8fafc" points="815,261 849,251 849,302 815,312" />
          <polygon fill="#d8e4ef" points="825,278 837,274 837,294 825,298" />

          <polygon fill="#313842" points="865,305 913,291 913,360 865,374" />
          <polygon fill="#f8fafc" points="872,311 906,301 906,352 872,362" />
          <polygon fill="#ead9bc" points="881,327 894,323 894,341 881,345" />

          <polygon fill="#313842" points="906,285 954,271 954,340 906,354" />
          <polygon fill="#f8fafc" points="913,291 947,281 947,332 913,342" />
          <polygon fill="#d6e7e3" points="923,306 935,302 935,322 923,326" />

          <polygon fill="#313842" points="950,327 998,313 998,382 950,396" />
          <polygon fill="#f8fafc" points="957,333 991,323 991,374 957,384" />
          <polygon fill="#d7d4f5" points="968,349 980,345 980,364 968,368" />

          <line opacity="0.22" stroke="#ffffff" strokeWidth="3" x1="818" x2="850" y1="268" y2="258" />
          <line opacity="0.22" stroke="#ffffff" strokeWidth="3" x1="876" x2="907" y1="317" y2="308" />
          <line opacity="0.22" stroke="#ffffff" strokeWidth="3" x1="918" x2="948" y1="298" y2="289" />
          <line opacity="0.22" stroke="#ffffff" strokeWidth="3" x1="961" x2="991" y1="339" y2="330" />
        </g>
      </svg>

      <div className="room-lamp-glow" />
      <div className="room-desk-glow" />

      {projects.map((project) => {
        const isActive = project.id === activeId
        const isNearby = project.id === nearbyId
        const isSelected = project.id === selectedId
        const displayPosition = displayPositionForProject(project)
        const scale = depthScaleForPosition(displayPosition)
        const labelPlacement = labelPlacementForProject(project)

        return (
          <button
            className={`room-object label-${labelPlacement}${isActive ? ' is-active' : ''}${isNearby ? ' is-nearby' : ''}${isSelected ? ' is-selected' : ''}`}
            key={project.id}
            onBlur={() => onHover(null)}
            onClick={(event) => {
              event.stopPropagation()
              onSelect(project.id)
            }}
            onMouseEnter={() => onHover(project.id)}
            onMouseLeave={() => onHover(null)}
            style={{
              '--object-scale': scale,
              '--project-color': project.color,
              left: `${displayPosition.x}%`,
              top: `${displayPosition.y}%`,
              zIndex: Math.round(displayPosition.y * 10),
            }}
            type="button"
          >
            <span className="hotspot-bloom" />
            <span className="hotspot-stem" />
            <span className="hotspot-dot" />
            <span className="object-label">
              <strong>{project.roomLabel}</strong>
              <small>{project.shortLabel}</small>
            </span>
          </button>
        )
      })}

      <div
        aria-hidden="true"
        className="player-avatar"
        style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`,
          zIndex: Math.round(playerPosition.y * 10 + 8),
        }}
      >
        <span className="avatar-shadow" />
        <span className="avatar-head" />
        <span className="avatar-body" />
        <span className="avatar-accent" />
      </div>
    </div>
  )
}
