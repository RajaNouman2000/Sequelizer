import { Op } from "sequelize";
import fs, { truncate } from "fs";
import path from "path";

import {
  Order,
  OrderDetail,
  Payment,
  Product,
  ProductLine,
  Office,
  Employee,
  Customer,
  sequelize
} from "../models/productline.js";

export const getProductLine = async function (req, res) {
  try {
    const products = await  ProductLine.findAll()
      

    res.status(200).json({data:{productLine:products}});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const totalOrderByCustomer = async (req, res) => {
    try {
      const result = await Customer.findAll({
        attributes: [
          'customerNumber',
          'customerName',
          [sequelize.fn('count', sequelize.col('orders.orderNumber')), 'Orders'],
        ],
        include: [
          {
            model: Order,
            required:true,
            attributes: [], // You may want to specify the attributes you need from the Order model
          },
        ],
        group: ['customerNumber'],
        order: [[sequelize.fn('count', sequelize.col('orders.customerNumber')), 'DESC']],
      });
  
      res.json(result);
    } catch (error) {
      console.error('Error in totalOrderByCustomer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const totalPaymentMadeByEachCustomer = async (req, res) => {
  try {
    const result = await Customer.findAll({
      attributes: [
        'customerNumber',
        'customerName',
        [sequelize.fn('sum', sequelize.col('payments.amount')), 'OrderCount'],
      ],
      include: [
        {
          model: Payment,
          attributes: [], // You may want to specify the attributes you need from the Order model
          required:true,
          },
      ],
      group: ['customerNumber']
    });
 

    res.json(result);
  } catch (error) {
    console.error('Error in totalOrderByCustomer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const totalNumberOfTimeAproductIsOrder= async (req,res)=>{
  try {
    const result = await Product.findAll({
      attributes: [
        'productCode',
        'productName',
        [sequelize.fn('count', sequelize.col('orderdetails.orderNumber')), 'Total Amount'],
      ],
      include: [
        {
          model: OrderDetail,
          attributes: [], // You may want to specify the attributes you need from the Order model
          required:true,
          },
      ],
      group: ['productCode','productName',],
      order: [[ sequelize.col('Total Amount'), 'DESC']],
    });

    res.json(result);
  } catch (error) {
    console.error('Error in totalOrderByCustomer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const namesOfEmployees = async (req, res) => {
  try {
    const result = await Employee.findAll({
      attributes: ['lastName', 'firstName'],
      include: [
        {
          model: Customer,
          attributes: [], // You may want to specify the attributes you need from the Order model
          required:false,
         
        },
      ],
      where: {
        customerName: sequelize.literal(
          "customers.customerName IS null"
        ),
      },
    });

    res.json(result);
  } catch (error) {
    console.error('Error in namesOfEmployees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const totalNumberOfOrderByCustomer = async (req,res)=>{
  try {
    const result = await Customer.findAll({
      attributes: [
        'customerNumber',
        'customerName',
        [sequelize.fn('count', sequelize.col('customer.customerNumber')), 'Total Order'],
      ],
      include: [
        {
          model: Order,
          attributes: [], // You may want to specify the attributes you need from the Order model
          required:true,
          },
      ],
      group: ['customerNumber']
    });

    res.json(result);
  } catch (error) {
    console.error('Error in totalOrderByCustomer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const averagePaymentMadeByCustomer = async (req, res) => {
  const result = await Customer.findAll({
    attributes: [
      "city",
       [sequelize.fn("AVG", sequelize.col("payments.amount")), "average_salary"],
    ],
    include: [
      {
        model: Payment,
        attributes: [],
      },
    ],
    group: ["customerName"],
    having: sequelize.literal("average_salary > 1000"),
  });
  
  res.send(result);
};

export const totalNumberOfTimeAProductIsOrderInQunatity = async (req, res) => {
  try{
    const result = await Product.findAll({
      attributes: [
        "productName",
         [sequelize.fn("sum", sequelize.col("orderdetails.quantityOrdered")), "Total Orders"],
      ],
      include: [
        {
          model: OrderDetail,
          attributes: [],
          required:true
          
        },
      ],
      group: ["product.productName"],
    })
    res.send(result)
  } catch (error) {
    console.error('Error in namesOfEmployees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 
};

export const employeeNotAssignedToCustomer= async (req,res)=>{
  try{
    const result = await Employee.findAll({
      attributes: [
        "lastName", "firstName",
      ],
     
      include: [
        {
          model: Customer,
          attributes: [],
          required: false,
                     
        },
        {
          model: Office,
          attributes: ["country"], 
          required:true,
          where: {
            country:'USA'
          },         
        },
      ],
      
      where: {
        '$customers.salesRepEmployeeNumber$': null, // Use the correct alias for the association
      },
    });
    res.send(result)
  } catch (error) {
    console.error('Error in namesOfEmployees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export default { 
  getProductLine,
  totalOrderByCustomer,
  totalPaymentMadeByEachCustomer,
  totalNumberOfTimeAproductIsOrder,
  namesOfEmployees,
  totalNumberOfOrderByCustomer,
  averagePaymentMadeByCustomer,
  totalNumberOfTimeAProductIsOrderInQunatity,
  employeeNotAssignedToCustomer
 };
