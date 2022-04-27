export const ordenCats = (categories) => {
    categories.sort(function (a,b) {
        if (a.orden > b.orden) {
            return 1;
        } 
        if (a.orden < b.orden) {
            return -1;
        }
        return 0
    })
  }