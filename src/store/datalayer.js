
let datalayerInit = {}
if (dataLayer) {
  for (let i = 0; i < datalayerInit.length; i++) {
    console.log(datalayerInit[i])
    if (datalayerInit[i].ecommerce) {
      datalayerInit = datalayerInit[i].ecommerce
      console.log(datalayerInit[i].ecommerce)
    }
  }
}
export default datalayerInit
