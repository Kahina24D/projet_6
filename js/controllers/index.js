

import { initWorks } from "./index.works.js";
import { initFilter } from "./index.filter.js";
import { initModal } from "./modals.js";
import { initLogin } from "./login.js";







async function init() {


  initWorks()

  initFilter()
  initLogin()

  initModal()


}



init();



