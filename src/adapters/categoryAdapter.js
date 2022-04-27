export const createAdaptedCategory = (doc) => {
    const data = doc.data()

    const formattedCategory = {
        id: doc.id,
        label: data.label,
        orden: data.orden
    }

    return formattedCategory
}