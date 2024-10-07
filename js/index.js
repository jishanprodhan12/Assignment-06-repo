const showCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories);
}
// all pets show 
const allPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    showAllPet(data.pets);

}

const displayCategories = (data) => {
    //target div 
    const categoriesContainer = document.getElementById('categories-btn-container');
    data.forEach(item => {
        // create btn 
        const categorieBtn = document.createElement('button');
        const { id, category, category_icon } = item;
        categorieBtn.innerHTML = `
                    <button class="btn hover:bg-primary-color btn-lg  btn-outline flex rounded-md " onclick="showEachCategorie('${category}')">
                        <span class"w-8 h-8">

                            <img src="${category_icon}" alt="" class"w-full">
                        </span>
                        <span> ${category}</span>
                    </button>
        `
        categoriesContainer.appendChild(categorieBtn);
    });
}


// {
//     "petId": 16,
//     "breed": "English Angora",
//     "category": "Rabbit",
//     "date_of_birth": "2023-08-05",
//     "price": 300,
//     "image": "https://i.ibb.co.com/zZHPJNh/pet-16.jpg",
//     "gender": "Female",
//     "pet_details": "This fluffy female English Angora rabbit, born on August 5, 2023, is known for her long, luxurious fur. Priced at $300, she's perfect for families who enjoy grooming and cuddling. She is not vaccinated.",
//     "vaccinated_status": "Not",
//     "pet_name": "Snowball"
// }

const showAllPet = (pets) => {
    const petCardContainer = document.getElementById('pet-card-cotainer');
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        const { breed, image, pet_name, gender, date_of_birth, price, petId } = pet;

        petCard.innerHTML = `
            <div class="card bg-base-100 shadow-xl ">
                        <figure class="px-10 pt-10">
                          <img
                            src="${image}"
                            alt="Shoes"
                            class="rounded-xl" />
                        </figure>
                        <div class="card-body ">
                          <h2 class="card-title">${(pet_name === undefined ? ' not Available' : pet_name)}</h2>
                          <p class="flex items-center gap-2">
                            <span class="w-4 h-4"><img src="./images/Frame.png" alt="" class="w-full object-cover"></span>
                            <span class="text-sm text-gray-500">Breed: ${(breed === undefined ? ' not Available' : breed)}</span>
                        </p>
                        <p class="flex items-center gap-2">
                            <span><i class="fa-regular fa-calendar"></i></span>
                            <span  class="text-sm text-gray-500">Birth: ${(date_of_birth === undefined ? ' not Available' : date_of_birth)}</span>
                        </p>
                        <p class="flex items-center gap-2">
                            <span><i class="fa-solid fa-venus"></i></span>
                            <span class="text-sm text-gray-500">Gender: ${(gender === undefined ? ' not Available' : gender)}</span>
                        </p>
                          <p class="flex items-center gap-2">
                            <span><i class="fa-solid fa-dollar-sign"></i></span>
                            <span class="text-sm text-gray-500">Price : ${(price === null ? ' not Available' : price)}$</span>
                        </p>
                        <div class="divider"></div>
                         <div class="flex items-center justify-between gap-1 md:gap-2 ">
                            <!-- btn  -->
                            <div >
                                <button id="btn-like" class="btn btn-outline   font-extrabold btn-sm " onclick="addLikeContainer('${image}')">
                                  <span><i class="fa-regular fa-thumbs-up"></i></span></button>
                            </div>
                            <div>
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm">Adopt </button>
                            </div>
                            <div>
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm">Details </button>
                            </div>
                          </div>
                        </div>
                      </div>
        `
        petCardContainer.appendChild(petCard);
    })
}
const addLikeContainer = (likedImg) => {
    //target container
    const likedContainer = document.getElementById('liked-container');
    // create element 
    const likeCard = document.createElement('div');
    likeCard.innerHTML = `

            <div class"rounded-lg">
                <img src="${likedImg}" alt="" class="w-full object-cover rounded-md">
            </div> 
    `
    likedContainer.appendChild(likeCard);
}


const showEachCategorie = async (eachPet) => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${eachPet}`);
    const data = await res.json();
    displayEachPet(data.data);

}
const displayEachPet=(pet)=>{
    console.log(pet);
    const petCardContainer = document.getElementById('pet-card-cotainer');
    petCardContainer.innerHTML='';
    const {length}=pet;
    if(length){
        pet.forEach(pet =>{
            const petCard = document.createElement('div');
         
        const { breed, image, pet_name, gender, date_of_birth, price, petId } = pet;
    
            petCard.innerHTML = `
                <div class="card bg-base-100 shadow-xl ">
                            <figure class="px-10 pt-10">
                              <img
                                src="${image}"
                                alt="Shoes"
                                class="rounded-xl" />
                            </figure>
                            <div class="card-body ">
                              <h2 class="card-title">${(pet_name === undefined ? ' not Available' : pet_name)}</h2>
                              <p class="flex items-center gap-2">
                                <span class="w-4 h-4"><img src="./images/Frame.png" alt="" class="w-full object-cover"></span>
                                <span class="text-sm text-gray-500">Breed: ${(breed === undefined ? ' not Available' : breed)}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <span><i class="fa-regular fa-calendar"></i></span>
                                <span  class="text-sm text-gray-500">Birth: ${(date_of_birth === undefined ? ' not Available' : date_of_birth)}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <span><i class="fa-solid fa-venus"></i></span>
                                <span class="text-sm text-gray-500">Gender: ${(gender === undefined ? ' not Available' : gender)}</span>
                            </p>
                              <p class="flex items-center gap-2">
                                <span><i class="fa-solid fa-dollar-sign"></i></span>
                                <span class="text-sm text-gray-500">Price : ${(price === null ? ' not Available' : price)}$</span>
                            </p>
                            <div class="divider"></div>
                             <div class="flex items-center justify-between gap-1 md:gap-2 ">
                                <!-- btn  -->
                                <div >
                                    <button id="btn-like" class="btn btn-outline   font-extrabold btn-sm " onclick="addLikeContainer('${image}')">
                                      <span><i class="fa-regular fa-thumbs-up"></i></span></button>
                                </div>
                                <div>
                                    <button class="btn btn-outline  text-primary-color font-extrabold btn-sm">Adopt </button>
                                </div>
                                <div>
                                    <button class="btn btn-outline  text-primary-color font-extrabold btn-sm">Details </button>
                                </div>
                              </div>
                            </div>
                          </div>
            `
            petCardContainer.appendChild(petCard);
        });
    }else{
    const petCardContainer = document.getElementById('pet-card-cotainer');
    const notFound = document.createElement('div') ;
    notFound.innerHTML = `
        <div class="w-full mx-auto ">
        <img src="./images/error.webp" alt="">
        </div>
    
    `
    petCardContainer.appendChild(notFound);
    }
   
}
showCategories();
allPets();