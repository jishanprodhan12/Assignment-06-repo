const showCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data.categories);
        })
        .catch((error) => console.log(error));
}

// remove active
const removeActiveClass = () => {
    const RemoveBtn = document.getElementsByClassName('catagorie-active');
    for (const btn of RemoveBtn) {
        btn.classList.remove('active', 'rounded-lg', 'bg-transparent');
    }

}
const displayCategories = (data) => {
    //target div 
    const categoriesContainer = document.getElementById('categories-btn-container');
    data.forEach(item => {
        // create btn 
        const categorieBtn = document.createElement('button');
        const { id, category, category_icon } = item;
        categorieBtn.innerHTML = `
                    <button class="btn btn-lg  border-2 bg-transparent hover:bg-transparent flex rounded-lg shadow-md gap-2  overflow-hidden catagorie-active " onclick="showEachCategorie('${category}')" id="categorie-btn${category}">
                        <span class="w-12 h-12">

                            <img src="${category_icon}" alt="" class="w-full">
                        </span>
                        <span> ${category}</span>
                    </button>
        `
        categoriesContainer.appendChild(categorieBtn);
    });

}

// all pets show 
const allPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    showAllPet(data.pets);

}



showAllPet = (pets) => {
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
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm" id="adopt-modal-btn${petId}" onclick="showAdoptModal(${petId})">Adopt </button>
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
    removeActiveClass();

    const addActive = document.getElementById(`categorie-btn${eachPet}`);
    addActive.classList.add('active');
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
                                    <button class="btn btn-outline  text-primary-color font-extrabold btn-sm"
                                    id="adopt-modal-btn${petId}" onclick="showAdoptModal(${petId})">Adopt </button>
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
                <p class="text-sm text-gray-500 w-full lg:w-3/4 mx-auto text-center my-2">It seems the bird you're searching for cannot be found. Please double-check the name or try a different search term. Our collection may not currently include this bird, but feel free to explore other categories!</p>
            </div>
        </div>
    
    `
        petCardContainer.appendChild(notFound);
    }

}

const showPetDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const data = await res.json();
        showPetModal(data.petData);
    } catch (error) {
        console.log(error);
    }


}

const showPetModal = (Details) => {
    const { breed, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = Details;
    const DetailsModalContainer = document.getElementById('details-modal-container');
    DetailsModalContainer.innerHTML = `
    
                <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <!-- modal body  -->
                        <div >  
                            <div class="w-11/12 mx-auto shadow-sm rounded-lg">
                                <img src="${image}" alt="" class="w-full object-cover">
                            </div>
                            <!-- text  -->
                             <div class="my-2">
                    
                                <h3 class="text-xl font-bold">${(pet_name === undefined ? ' not Available' : pet_name)}</h3>
                                <!-- breed gender container -->
                                <div class="grid grid-cols-2 gap-1 md:gap-3 my-3">
                                    <p class="flex items-center gap-2">
                                        <span class="w-4 h-4"><img src="./images/Frame.png" alt="" class="w-full object-cover"></span>
                                        <span class="text-sm text-gray-500">${(breed === undefined ? ' not Available' : breed)}</span>
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
                                        <span class="text-sm text-gray-500">Price : ${(price === undefined ? ' not Available' : price)}$</span>
                                    </p> 
                                    <p class="flex items-center gap-2">
                                        <span><i class="fa-solid fa-venus"></i></span>
                                        <span class="text-sm text-gray-500">Vaccinated status: ${(vaccinated_status === undefined ? ' not Available' : vaccinated_status)}</span>
                                    </p>
                                </div>
                             </div>
                             <!-- decription  -->
                              <div class="my-2 gap-2">
                                <h3 class="text-xl font-extrabold">Details Information</h3>
                                <ul class="list-disc ml-3">
                                    <li class="text-sm text-gray-500">${pet_details}</li>
                                </ul>
                              </div>

                        </div>
                        <!-- close model btn -->
                       
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button
                                    class="btn bg-lime-50 w-full text-primary-color text-xl font-bold">Close</button>
                            </form>
                        
                    </div>
                </dialog>
    
    `
    my_modal_5.showModal();
}

const closeModal = (button) => {
    const modal = document.getElementById('adopt-Modal');
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    document.getElementById(`adopt-modal-btn${button}`).innerHTML = 'Adopted';
    document.getElementById(`adopt-modal-btn${button}`).classList.add('btn-disabled');
    document.getElementById(`adopt-modal-btn${button}`).onclick = null;
};
const showAdoptModal = (button) => {
    const modal = document.getElementById('adopt-Modal');
    const timerDisplay = document.getElementById('timer');


    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    let countdown = 3;
    timerDisplay.textContent = countdown;


    const interval = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            closeModal(button);
        }
    }, 1000);


    document.getElementById('closeModal').onclick = () => {
        clearInterval(interval);
        closeModal(button);
    };
};
//  const sortPrice=()=>{
//     console.log("sort btn clicked");
//     try{
//         fetch('https://openapi.programming-hero.com/api/peddy/pets')
//         .then((res)=> res.json())
//         .then((data)=> sort(data.pets));
//     }catch(e){
//         console.log(error);
//     }
//  }
//  const sort=(datas)=>{
//     console.log(datas);
//         const sortedPets = datas.pets.sort((a, b) => {

//             const priceA = a.price || 0;
//             const priceB = b.price || 0;
//             console.log(sortedPets);
//             return priceB - priceA;
//         });
        
// }

const sortPets=(sortd)=>{
    sortd.forEach(d=>{
        showSortPet(d);
    })

}
const showSortPet=(sort)=>{
    document.getElementById('pet-card-cotainer').classList.add("hidden");
    const sortContainer = document.getElementById('sort-card-container');
    // sort append 
     {
        const sortCard = document.createElement('div');
        const { breed, image, pet_name, gender, date_of_birth, price, petId } = sort;
        sortCard.innerHTML = `
            <div class="card bg-base-100 shadow-xl ">
                        <figure class="px-10 pt-10">
                          <img
                            src="${image}"
                           
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
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm" id="adopt-modal-btn${petId}" onclick="showAdoptModal(${petId})">Adopt </button>
                            </div>
                            <div>
                                <button class="btn btn-outline  text-primary-color font-extrabold btn-sm"
                                onclick="showPetDetails(${petId})" >Details </button>
                            </div>
                          </div>
                        </div>
                      </div>
        `
        sortContainer.append(sortCard);
    }
}
const sort = () => {

    console.log("sotring");

    document.getElementById('pet-card-cotainer').classList.add('hidden')
    document.getElementById('spiner').classList.remove('hidden')
    document.getElementById('spiner').classList.add('flex')



    setTimeout(async () => {
        document.getElementById('pet-card-cotainer').classList.remove('hidden')
        document.getElementById('spiner').classList.add('hidden')


        try {

            const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
            const data = await res.json();

            if (data.status && Array.isArray(data.pets)) {

                const sortedPets = data.pets.sort((a, b) => {

                    const priceA = a.price || 0;
                    const priceB = b.price || 0;
                    return priceB - priceA;


                });


                sortPets(sortedPets);
            } else {
                console.error('No pets found or status is not successful.');
            }

        } catch (error) {
            console.error('Error fetching the pets:', error);
        }

    }, 2000)

};

showCategories();
allPets();