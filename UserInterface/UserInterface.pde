/**
 */
import processing.serial.*;

final int ENGDUINO_PORT_INDEX = 3; // the Engduino is on the first port

Serial serial;
String message; 
int xPosition = 1;
int startTime;

void setup() {
  size(600, 400);
  background(0);
  String portName = Serial.list()[ENGDUINO_PORT_INDEX]; 
  serial = new Serial(this, portName, 9600);
  startTime = millis();
}

void draw() {
  stroke(127, 34, 255);

  readSerial();
}

void readSerial() {
  if (serial.available() > 0) {  
    message = serial.readStringUntil('\n');
    if (message != null) {
      String[] data = message.split(",");

      updateLocalGraph(Integer.parseInt(data[0]));
    }
  }
}

/**
 * Adds a new 'bar' to the barchart, clearing the screen if no more space
 */
void updateLocalGraph(int lightLevel) {
  line(xPosition, height, xPosition, height - lightLevel);
  if (xPosition >= width) { // no more space, so reset the background and start from beginning
    xPosition = 0;
    background(0);
  } else {
    xPosition++;
  }
}