/**
 * This function animates the Heart emoji by adding and removing the 'reaction-animation' class.
 * The function is executed in the AddReaction component.
 */

export default function heartAnimation() {
    const heart = document.querySelector('.heart')

    heart.classList.add('reaction-animation')
    setTimeout(function () {
        heart.classList.remove('reaction-animation')
    }, 1000)

    return <h1 class="class">Hello</h1>
}
