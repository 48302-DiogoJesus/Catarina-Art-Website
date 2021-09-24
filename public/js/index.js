const mainImage = document.getElementById('main-image')
const mainImageTitle = document.getElementById('main-image-title')
const mainImageDesc = document.getElementById('main-image-desc')
const mainImageLink = document.getElementsByClassName('main-image-container')[0].getElementsByTagName('a')[0]

const images = document.getElementsByClassName('image')
const imagesLinks = document.getElementsByClassName('image-container')
const imagesTitle = document.getElementsByClassName('sec-img-txt')

const prevButton = document.getElementById('prev-button')
const nextButton = document.getElementById('next-button')

const hoverButton = document.getElementsByClassName('categories')[0]
const menuHeight = document.getElementsByClassName('drop-down-menu-container')[0].getElementsByTagName('svg')[0]
const subMenu = document.getElementsByClassName('categories')[0].getElementsByTagName('ul')[0]
const aboutArtistButton = document.getElementsByClassName('about-the-artist')[0]

var currentImage = 0
const FOTOS_NUM = 7
updateBorder('')

var i = 0
for (let image of imagesTitle) {
    fetch(`/description/${images[i].src.substring(images[i].src.lastIndexOf('/')+1).split('.').slice(0, -1).join('.')}/one`).then(res => res.json()).then(
        (data) => {
            image.innerText = data.title
        })
    i++
}

hoverButton.addEventListener('mouseenter', () => {
    if (window.innerWidth > 900) {
        subMenu.style.opacity = "1"
        subMenu.style.visibility = "visible"
        menuHeight.style.height = "165px";
        document.getElementsByClassName('drop-down-menu-container')[0].style.height = "165px"
        
    }
})
hoverButton.addEventListener('mouseleave', () => {
    if (window.innerWidth > 900) {
        subMenu.style.opacity = "0"
        subMenu.style.visibility = "hidden"
        document.getElementsByClassName('drop-down-menu-container')[0].style.height = "80px"
        menuHeight.style.height = "75px";
    }
})
hoverButton.addEventListener('click', () => {
    console.log('CLICKED')
    if (window.innerWidth <= 900) {
        console.log('PHONE')
        let display = hoverButton.getElementsByTagName('ul')[0].style.display
        if (subMenu.style.opacity == "0" ||subMenu.style.opacity == "") {
            aboutArtistButton.style.paddingTop = "85px"
            subMenu.style.opacity = "1"
            subMenu.style.visibility = "visible"
            menuHeight.style.height = "260px";    
            document.getElementsByClassName('drop-down-menu-container')[0].style.height = "260px"
        } else {
            aboutArtistButton.style.paddingTop = "0px"
            subMenu.style.opacity = "0"
            subMenu.style.visibility = "hidden"
            menuHeight.style.height = "130px";
            document.getElementsByClassName('drop-down-menu-container')[0].style.height = "145px"
        }
    }
})
   

function deviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

nextButton.addEventListener('click', async () => {
    currentImage += 1

    if (images[currentImage] == undefined) {
        currentImage = 0
    }

    mainImage.src = images[currentImage].src

    mainImageLink.href = imagesLinks[currentImage].getElementsByTagName('a')[0].href
    
    var descFile = images[currentImage].src.substring(images[currentImage].src.lastIndexOf('/')+1).split('.').slice(0, -1).join('.')
    fetch(`/description/${descFile}/one`).then(res => res.json()).then(data => {
        mainImageTitle.innerText = data.title
        mainImageDesc.innerText = data.description
    })
    
    updateBorder('next')
})

prevButton.addEventListener('click', async () => {
    currentImage -= 1

    if (images[currentImage] == undefined) {
        currentImage = images.length-1
    }
    
    mainImage.src =  images[currentImage].src

    mainImageLink.href = imagesLinks[currentImage].getElementsByTagName('a')[0].href

    var descFile = images[currentImage].src.substring(images[currentImage].src.lastIndexOf('/')+1).split('.').slice(0, -1).join('.')

    fetch(`/description/${descFile}/one`).then(res => res.json()).
    then(data => {
            mainImageTitle.innerText = data.title
            mainImageDesc.innerText = data.description
        })
    
    updateBorder('prev')
})

function updateBorder(buttonPressed) {
    if (deviceType() == 'desktop') {
        if (currentImage == 0 && buttonPressed === 'next') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 0;
        } else if (currentImage == images.length-1 && buttonPressed === 'prev') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 999999;
        } else if (buttonPressed === 'next') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft += 303;
        } else if (buttonPressed === 'prev') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft -= 303;
        } 
        else {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 0;
        }
    } else {
        if (currentImage == 0 && buttonPressed === 'next') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 0;
        } else if (currentImage == images.length-1 && buttonPressed === 'prev') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 999999;
        } else if (buttonPressed === 'next') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft += 159.5;
        } else if (buttonPressed === 'prev') {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft -= 159.5;
        } 
        else {
            document.getElementsByClassName('secondary-images-container')[0].scrollLeft = 0;
        }
    }

    for (let i = 0; i < FOTOS_NUM; i++) {
        images[i].style.border = "1px solid black"
        images[i].style.borderRadius = "0px"    
    }
    images[currentImage].style.border = "6px dashed black"
    images[currentImage].style.borderRadius = "10px"
}
