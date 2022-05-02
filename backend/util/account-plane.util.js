const plans = {
    Default: "Silver",
    Silver: "Gold",
    Gold: "Diamond",
    Diamond: "Platinum",
    Platinum: null
}

Object.freeze(plans)    

export {
    plans
}