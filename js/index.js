const showCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories);


}
const displayCategories = (data) => {
    console.log(data);
    //target div 
const categoriesContainer =document.getElementById('categories-btn-container');

    data.forEach(item => {
        console.log(item);
        // create btn 
        const categorieBtn = document.createElement('button');
   
        categorieBtn.innerHTML = `
                    <button class="btn hover:bg-primary-color btn-lg  btn-outline flex rounded-md ">
                        <span class"w-8 h-8">

                            <img src="${item.category_icon}" alt="" class"w-full">
                        </span>
                        <span> ${item.category}</span>
                    </button>
        `
        categoriesContainer.appendChild(categorieBtn);
    });
}
showCategories();