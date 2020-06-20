const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router()


function accountValid(account){
    return Boolean(account.name && account.budget)
}

//get accounts
router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        console.log({error})
        res.status(500).json({
            message: "could not get accounts"
        })
    })
})
//get accounts with id
router.get('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .first()
      .then(account => {
        if (account) {
          res.status(200).json(account);
        } else {
          res.status(404).json({ message: 'acount not found' });
        }
      })

      .catch(error => {
        console.log({error})
        res.status(500).json({
            message: "error"
        })
    })
      
  });

  //new account

router.post('/',(req,res)=>{
    const account = req.body
    if(accountValid(account)){
        db('accounts')
        .insert(account)
        .then(newAccount=>{
            res.status(201).json({
                data:newAccount
            })
        })
        .catch(error => {
            console.log({error})
            res.status(500).json({
                message: "error"
            })
        })

    }

    else{
        res.status(404).json({ message: 'account not found' });

    }
})

//edit account
router.put('/:id',(req,res)=>{
    const editAccount = req.body
    db('accounts')
    .where({id:req.params.id})
    .update(editAccount)
    .then(account => {
        if(account > 0){
            res.status(200).json({data: account})
        }
        else{
            res.status(404).json({
                message: "account not foudn by that id"
            })
        }
    })

    .catch(error => {
        console.log({error})
        res.status(500).json({
            message: "error"
        })
    })
})

//delete count
router.delete('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .delete()
      .then(account => {
        res.status(200).json({ message: `${account}  deleted` });
      })
      .catch(() => {
        res.status(500).json({ message: 'cannot delete account' });
      });
  });
  
  
  
  module.exports = router;