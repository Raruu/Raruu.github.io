function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}
function AbsRound(x){
    return Math.round(Math.abs(x));
}
function generateCirclePoints(radius, numberOfPoints) {
    const points = [];
    const angleIncrement = (2 * Math.PI) / numberOfPoints;
  
    for (let i = 0; i < numberOfPoints; i++) {
      const theta = i * angleIncrement;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      points.push({ x, y });
    }  
    return points;
  }  

  const radius = 100; 
  const numberOfPoints = 360; 
  const circlePoints = generateCirclePoints(radius, numberOfPoints);
  

const ring_List = document.getElementById("ring-list");
/*
ring_List.children[0].style.left = `${circlePoints[0].x}%`;
ring_List.children[0].style.top = `${circlePoints[0].y}%`;
ring_List.children[1].style.left = `${circlePoints[44].x}%`;
ring_List.children[1].style.top = `${circlePoints[44].y}%`;
*/

const itemsGap_ring_List = AbsRound(360 / ring_List.children.length) - 1;
for(var i = 0; i < ring_List.children.length; i++){
    if(circlePoints[itemsGap_ring_List*i].x < 0){
        ring_List.children[i].style.paddingRight = `${AbsRound(circlePoints[itemsGap_ring_List*i].x)}%`;
    }else{
        ring_List.children[i].style.paddingLeft = `${AbsRound(circlePoints[itemsGap_ring_List*i].x)}%`;
    }
    console.log(`X[${i}]: ${circlePoints[itemsGap_ring_List*i].x}`);
    
    if(circlePoints[itemsGap_ring_List*i].y < 0){
        ring_List.children[i].style.paddingBottom = `${AbsRound(circlePoints[itemsGap_ring_List*i].y)}%`;
    }else{
        ring_List.children[i].style.paddingTop = `${AbsRound(circlePoints[itemsGap_ring_List*i].y)}%`;
    }

    ring_List.children[i].children[0].style.transform = `rotate(${(itemsGap_ring_List+1)*(i+1)}deg)`;
    console.log(`Y[${i}]: ${circlePoints[itemsGap_ring_List*i].y}`);
}
console.log(circlePoints);
console.log(ring_List.children.length);
