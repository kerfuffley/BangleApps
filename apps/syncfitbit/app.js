var counter = 30;
var counterInterval;

function countDown() {
  counter--;
  
  if (counter<=0) {
    // stop the timer
    clearInterval(counterInterval);
    counterInterval = undefined;
    // display the 'out of time' message
    E.showMessage("Out of Time","My Timer");
    // Now buzz
    Bangle.buzz();
    // again, every 5 seconds
    counterInterval = setInterval(() => Bangle.buzz(), 5000);
    
    // Ensure a button press resets the timer
    Bangle.setUI({
      mode : "custom",
      btn : ()=>{
        // remove old button press handler
        Bangle.setUI();
        // restart timer
        startTimer();
      }
    });
    
    return;
  }

  g.clear(1); // clear screen and reset graphics state
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",80);
  // draw the current counter value
  g.drawString(counter, g.getWidth()/2, g.getHeight()/2);
  // optional - this keeps the watch LCD lit up
  Bangle.setLCDPower(1);
}

function startTimer() {
  counter = 30;
  countDown();
  // if we had an interval before, clear it
  if (counterInterval)
    clearInterval(counterInterval);
  // call countDown every second
  counterInterval = setInterval(countDown, 1000);
  
  // allow interaction, drag up/down and press button
  Bangle.setUI({
    mode : "updown",
  }, dir => {
    if (!dir) { // if tapped or button pressed, start/stop
      if (counterInterval) {
        clearInterval(counterInterval);
        counterInterval = undefined;
      } else counterInterval = setInterval(countDown, 1000);
    } else { // otherwise if dir nonzero, count time up/down
      counter += dir + 1; // +1 because countDown decrements
      if (counter<3) counter=3;
      countDown();
    }
  });
}

startTimer();
