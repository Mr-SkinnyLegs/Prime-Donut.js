var pretag = document.getElementById("d");
var cOlOrS = false //more colors!!! change this to toggle background color change on/of

var tmr1 = undefined,
  tmr2 = undefined;
var A = 1,
  B = 1;
var hue = 0

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

var asciiframe = () => {
  var colorrgb = hsvToRgb(hue, 1, 1)
  var colorhex = rgbToHex(colorrgb[0], colorrgb[1], colorrgb[2])
  var inversecolorhex = rgbToHex(255-colorrgb[0], 255-colorrgb[1], 255-colorrgb[2])
  var b = [];
  var z = [];
  A += 0.07;
  B += 0.03;
  var cA = Math.cos(A),
    sA = Math.sin(A),
    cB = Math.cos(B),
    sB = Math.sin(B);
  for (var k = 0; k < 1760; k++) {
    b[k] = k % 80 == 79 ? "\n" : " ";
    z[k] = 0;
  }
  for (var j = 0; j < 6.28; j += 0.07) {
    // j <=> theta
    var ct = Math.cos(j),
      st = Math.sin(j);
    for (i = 0; i < 6.28; i += 0.02) {
      // i <=> phi
      var sp = Math.sin(i),
        cp = Math.cos(i),
        h = ct + 2, // R1 + R2*cos(theta)
        D = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
        t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

      var x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
        y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
        o = x + 80 * y,
        N =
          0 |
          (8 *
            ((st * sA - sp * ct * cA) * cB -
              sp * ct * sA -
              st * cA -
              cp * ct * sB));
      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
      }
    }
  }
  document.getElementById("heheheha").style.color = colorhex
  if (cOlOrS == true) {
    document.getElementById("heheheha").style.backgroundColor = inversecolorhex;
  }
  hue += 0.005
  pretag.innerHTML = b.join("");
};

setInterval(asciiframe, 20)
