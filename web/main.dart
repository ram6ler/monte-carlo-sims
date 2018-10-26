import 'dart:html';
import 'dart:async';
import 'dart:math' show Random;
import 'package:setalpha/setalpha.dart' as sa;

void main() {
  DivElement output = querySelector('#output');
  CanvasElement canvas;
  DivElement pause;
  bool paused = true;
  int width, height;
  ImageData imageData;
  DivElement info;
  Iterable<num> getPixel(int x, int y) {
    var index = y * width * 4 + x * 4;
    return [0, 1, 2].map((i) => imageData.data[index + i]);
  }

  int successes = 0, experiments = 0;
  var rand = Random();

  ImageElement(src: "lake.png")
    ..onLoad.listen((event) {
      var img = event.target as ImageElement;
      width = img.width;
      height = img.height;
      canvas = CanvasElement(width: width, height: height)
        ..context2D.drawImage(img, 0, 0)
        ..onClick.listen((me) {
          var pixel = getPixel(me.offset.x, me.offset.y),
              color = sa.colorsNearestRGB("rgb(${pixel.join(",")})").first;
          info.innerHtml = color;
          print(color);
        });
      imageData = canvas.context2D.getImageData(0, 0, width, height);
      info = DivElement()
        ..innerHtml = "0 / 0"
        ..classes.add("display");

      pause = DivElement()
        ..classes.add("my-button")
        ..innerHtml = "Start"
        ..onClick.listen((e) {
          if (paused) {
            (e.target as DivElement).innerHtml = "Pause";
            paused = false;
          } else {
            (e.target as DivElement).innerHtml = "Continue";
            paused = true;
          }
        });
      output.children.addAll([pause, info, canvas]);

      canvas.context2D
        ..font = "10pt Arial"
        ..textAlign = "center"
        ..textBaseline = "middle";

      Timer.periodic(Duration(seconds: 1), (_) {
        if (!paused) {
          for (int _ = 0; _ < 100; _++) {
            int x = rand.nextInt(width), y = rand.nextInt(height);
            var pixel = getPixel(x, y),
                color = sa.colorsNearestRGB("rgb(${pixel.join(",")})").first;
            if (color == "lightblue") {
              successes++;
              canvas.context2D
                ..fillStyle = sa.setAlpha(sa.Color.darkGreen, 0.5)
                ..fillText("o", x, y);
            } else {
              canvas.context2D
                ..fillStyle = sa.setAlpha(sa.Color.darkRed, 0.5)
                ..fillText("x", x, y);
            }

            experiments++;
          }
          info.innerHtml = "$successes / $experiments";
        }
      });
    });
}
