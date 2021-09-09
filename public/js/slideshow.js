const slideshow = document.getElementsByClassName('slideshow')[0]
const slidenext = document.getElementsByClassName('slideshow-next-button')[0]
const slideprev = document.getElementsByClassName('slideshow-prev-button')[0]

// IMAGE FOLDERS
var images = null
var currentImage = 0

var requestFor = '/slideshow/' + window.location.href.substring(window.location.href.lastIndexOf('/')+1) + "/all"

window.addEventListener('DOMContentLoaded', () => {
    if (requestFor.includes("photographs")) {
        requestFor = "/photographs/get/all"
    }
    fetch(`${requestFor}`).then(res => res.json()).then(resp => {
        images = resp.pics
        slideshow.getElementsByClassName('image')[0].src = images[0]
        console.log(images)
    })
})

slidenext.addEventListener('click', () => {
    if (currentImage == images.length - 1) {
        currentImage = 0
        slideshow.getElementsByClassName('image')[0].src = images[currentImage]
    } else {
        slideshow.getElementsByClassName('image')[0].src = images[++currentImage]
    }
})

slideprev.addEventListener('click', () => {
    if (currentImage == 0) {
        currentImage = images.length - 1
        slideshow.getElementsByClassName('image')[0].src = images[currentImage]
    } else {
        slideshow.getElementsByClassName('image')[0].src = images[--currentImage]
    }
})
