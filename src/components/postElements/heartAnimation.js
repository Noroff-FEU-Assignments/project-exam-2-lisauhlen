export default function heartAnimation() {
    
    const heart = document.querySelector(".heart")

    heart.classList.add("reaction-animation");
    setTimeout(function(){heart.classList.remove("reaction-animation");}, 1000);
    
}
