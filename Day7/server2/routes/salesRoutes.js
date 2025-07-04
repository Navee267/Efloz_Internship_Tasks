
const express = require('express');
const { getDB } = require('../services/db');
const router = express.Router()

router.get('/',async (req,res)=>{
    try{
        const pip = [
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  billMode: "Dining"
                }
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$products",
                  includeArrayIndex: "string",
                  preserveNullAndEmptyArrays: true
                }
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  products: {
                    p_id: "$products.p_id",
                    billMode: "$products.billMode",
                    pName: "$products.pName",
                    hasStock: "$products.hasStock",
                    cost: "$products.cost",
                    rate: "$products.sRate"
                  }
                }
            },
            {
              $group:
                /**
                 * _id: The id of the group.
                 * fieldN: The first field name.
                 */
                {
                  _id: "$_id",
                  pName: {
                    $first: "$products.pName"
                  },
                  hasStock: {
                    $first: "$products.hasStock"
                  },
                  cost: {
                    $sum: "$products.cost"
                  }
                }
            },
            {
              $sort:
                /**
                 * Provide any number of field/order pairs.
                 */
                {
                  rate: -1
                }
            },
            {
              $limit:
                /**
                 * Provide the number of documents to limit.
                 */
                5
            }
          ]    


          console.log("pip %j",pip);
          const users = await getDB().collection('sales').aggregate(pip).toArray()
          res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({error : "failed to fetch sales data"})
    }
})

module.exports = router