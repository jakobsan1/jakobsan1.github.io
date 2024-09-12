// Necessary piece of code to allow a set of commands when it initially starts running
document.addEventListener("DOMContentLoaded", () => {
    // Grabs all the images from the html code
    const images = document.querySelectorAll("img")

    // It then looks through all the images and it finds a random dog image using the fetch("url").
    for(const image of images){
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(response=> response.json())
        // The returned message is then the image of the dogs
        .then(data => {
            image.src = data.message
            // Width properties
            image.width = 100;
            // Height properties
            image.height = 100;


        })
    }

})