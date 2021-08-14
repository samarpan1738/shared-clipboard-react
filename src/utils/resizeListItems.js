function resizeListItem(li) {
    const grid = document.querySelector(".list");
    // Get grid attributes
    const rowHeight = parseFloat(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseFloat(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    const liHeight = parseFloat(li.getBoundingClientRect().height);
    
    const rowSpan = Math.ceil(
        (liHeight + rowGap ) / (rowHeight + rowGap)
    );

    li.style.gridRowEnd = "span " + rowSpan;
    // li.style.opacity = "1";
}

function resizeAllListItems() {
    const listItems = Array.from(document.querySelectorAll(".list__item"));
    console.log(listItems)
    listItems.forEach((li) => resizeListItem(li));
}
export default resizeAllListItems;
