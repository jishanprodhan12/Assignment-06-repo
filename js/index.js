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
                    <button class="btn btn-lg  border-2 bg-transparent hover:bg-transparent flex rounded-lg shadow-md gap-2  " onclick="showEachCategorie('${category}')">
                        <span class="w-12 h-12">

                            <img src="${category_icon}" alt="" class="w-full">
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
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm"
                                onclick="showPetDetails(${petId})" >Details </button>
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
    const spinerShow = document.getElementById('spiner');
    document.getElementById('pet-card-cotainer').innerText = "";
    spinerShow.classList.remove('hidden');
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${eachPet}`);
    const data = await res.json();
    const eachPetData = data.data;
    setTimeout(() => {
        spinerShow.classList.add("hidden");

        displayEachPet(eachPetData);
    }, 2000);
    console.log("2 min waste");
}
const displayEachPet = (pet) => {
    console.log(pet);
    const petCardContainer = document.getElementById('pet-card-cotainer');
    petCardContainer.classList.add("grid");
    petCardContainer.innerHTML = '';
    const { length } = pet;
    if (length) {
        pet.forEach(pet => {
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
                                    <button class="btn btn-outline  text-primary-color font-extrabold btn-sm"  onclick="showPetDetails(${petId})" >Details </button>
                                </div>
                              </div>
                            </div>
                          </div>
            `
            petCardContainer.appendChild(petCard);
        });
    } else {
        const petCardContainer = document.getElementById('pet-card-cotainer');
        petCardContainer.classList.remove("grid");
        const notFound = document.createElement('div');
        notFound.innerHTML = `
      
        <div class="flex flex-col items-center justify-center gap-3 bg-base-200 py-10">
            <div class="w-40 h-40">
                <img src="./images/error.webp" alt="" class="w-full">
            </div>
            <div >
                <h3 class=" md:text-3xl font-extrabold w-full lg:w-fit text center mx-auto my-2">No Information Available</h3> 
                <p class="text-sm text-gray-500 w-full lg:w-3/4 mx-auto text-center my-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        </div>
    
    `
        petCardContainer.appendChild(notFound);
    }

}

/**
 * 
 * @param {{
  "status": true,
  "message": "successfully fetched pet data using id 1",
  "petData": {
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
  }
}} Details 
 */
const showPetDetails=async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    showPetModal(data.petData);
     my_modal_5.showModal();
}
const showPetModal=(Details)=>{
    console.log(Details);
}
showCategories();
allPets();