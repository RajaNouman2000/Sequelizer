import express from 'express'
import {
    getProductLine,  
    totalOrderByCustomer ,
    totalPaymentMadeByEachCustomer,
    totalNumberOfTimeAproductIsOrder,
    namesOfEmployees,
    totalNumberOfOrderByCustomer,
    averagePaymentMadeByCustomer,
    totalNumberOfTimeAProductIsOrderInQunatity
  }
  from "../controller/controller.js";
  

const router = express.Router();

// Set up routes on the router
router.get('/productlines',getProductLine);
router.get('/totalorderbycustomer',totalOrderByCustomer);
router.get('/totalpaymentmadebyeachcustomer',totalPaymentMadeByEachCustomer);
router.get('/totalNumberOfTimeAproductIsOrder',totalNumberOfTimeAproductIsOrder);
router.get('/namesOfEmployees',namesOfEmployees);
router.get('/totalNumberOfOrderByCustomer',totalNumberOfOrderByCustomer);
router.get('/averagePaymentMadeByCustomer',averagePaymentMadeByCustomer);
router.get('/totalNumberOfTimeAProductIsOrderInQunatity', totalNumberOfTimeAProductIsOrderInQunatity);


export default router;