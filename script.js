const selectVoie = document.getElementById("selectVoie")
const selectFiliere = document.getElementById("selectFiliere")
const generale = document.getElementById("generale")
const technologique = document.getElementById("technologique")
const specialite1 = document.getElementById("specialite1")
const specialite2 = document.getElementById("specialite2")
const specialite3 = document.getElementById("specialite3")

var filiere = ""

const combinaisons = [
    ["Arts Plastiques", "Mathématiques", "Physique-Chimie"],
    ["Arts Plastiques", "Mathématiques", "SES"],
    ["Arts Plastiques", "HGGPo", "Humanité-Littérature-Philo"],
    ["Arts Plastiques", "HGGPo", "SES"],
    ["Mathématiques", "Physique-Chimie", "SVT"],
    ["Mathématiques", "Physique-Chimie", "HGGPo"],
    ["Mathématiques", "Physique-Chimie", "LLCE"],
    ["Mathématiques", "Physique-Chimie", "Anglais MC"],
    ["Mathématiques", "Physique-Chimie", "NSI"],
    ["Mathématiques", "SVT", "HGGPo"],
    ["Mathématiques", "SVT", "NSI"],
    ["SI", "Mathématiques", "NSI"],
    ["SI", "Mathématiques", "Physique-Chimie"],
    ["SI", "Arts Plastiques", "NSI"],
    ["Humanité-Littérature-Philo", "LLCE", "HGGPo"],
    ["Humanité-Littérature-Philo", "LLCE", "SES"],
    ["Humanité-Littérature-Philo", "LLCE", "Arts Plastiques"],
    ["Humanité-Littérature-Philo", "HGGPo", "SES"],
    ["Humanité-Littérature-Philo", "Mathématiques", "SES"],
    ["Humanité-Littérature-Philo", "Mathématiques", "HGGPo"],
    ["Humanité-Littérature-Philo", "Mathématiques", "LLCE"],
    ["Humanité-Littérature-Philo", "Mathématiques", "Anglais MC"],
    ["SES", "Mathématiques", "Physique-Chimie"],
    ["SES", "Mathématiques", "SVT"],
    ["SES", "Mathématiques", "HGGPo"],
    ["SES", "Mathématiques", "LLCE"],
    ["SES", "Mathématiques", "Anglais MC"],
    ["SES", "Mathématiques", "NSI"],
    ["SES", "HGGPo", "Anglais MC"],
    ["SES", "HGGPo", "NSI"],
    ["SES", "HGGPo", "SVT"],
]

function changerVoie(event) {
    generale.style.display = "none"
    technologique.style.display = "none"
    selectFiliere.value = ""
    changerFiliere(null)
    if (event.target.value == "technologique") {
        technologique.style.display = "initial"
    }
    if (event.target.value == "generale") {
        generale.style.display = "inline-block"
    }
}
selectVoie.value = ""
selectVoie.addEventListener("change", changerVoie)

function changerFiliere(event) {
    if (filiere != "") {
        document.getElementById(filiere).style.display = "none"
    }
    filiere = selectFiliere.value
    if (filiere != "") {
        document.getElementById(filiere).style.display = "initial"
    }
}
selectFiliere.value = ""
selectFiliere.addEventListener("change", changerFiliere)

function selectionSpecialite1() {
    const specialites = []
    combinaisons.forEach(c => {
        c.forEach(spe => {
            if (specialites.indexOf(spe) == -1) {
                specialites.push(spe)
            }
        })
    })
    return specialites.sort()
}

function selectionSpecialite2(spe1) {
    const specialites = []
    combinaisons.forEach(c => {
        if (c.indexOf(spe1) > -1) {
            c.forEach(spe => {
                if (spe != spe1 && specialites.indexOf(spe) == -1) {
                    specialites.push(spe)
                }
            })
        }
    })
    return specialites.sort()
}

function selectionSpecialite3(spe1, spe2) {
    const specialites = []
    combinaisons.forEach(c => {
        if (c.indexOf(spe1) > -1 && c.indexOf(spe2) > -1) {
            c.forEach(spe => {
                if (spe != spe1 && spe != spe2 && specialites.indexOf(spe) == -1) {
                    specialites.push(spe)
                }
            })
        }
    })
    return specialites.sort()
}

function placerOptions(select, listeOptions) {
    while (select.firstChild) {
        select.firstChild.remove()
    }
    const optionVide = document.createElement("option")
    optionVide.value = ""
    optionVide.textContent = "~~ choisir une spécialité ~~"
    select.appendChild(optionVide)
    listeOptions.forEach(nom => {
        const option = document.createElement("option")
        option.value = nom
        option.textContent = nom
        select.appendChild(option)
    })
}
placerOptions(specialite1, selectionSpecialite1())

function choisirSpe1(event) {
    if (specialite1.value == "") {
        specialite2.parentNode.style.visibility = "hidden"
        specialite3.parentNode.style.visibility = "hidden"
        specialite2.value = ""
        specialite3.value = ""
    } else {
        placerOptions(specialite2, selectionSpecialite2(specialite1.value))
        specialite2.parentNode.style.visibility = "visible"
        specialite3.parentNode.style.visibility = "hidden"
        specialite3.value = ""
    }
}
specialite1.value = ""
specialite1.addEventListener("change", choisirSpe1)

function choisirSpe2(event) {
    if (specialite2.value == "") {
        specialite3.parentNode.style.visibility = "hidden"
        specialite3.value = ""
    } else {
        placerOptions(specialite3, selectionSpecialite3(specialite1.value, specialite2.value))
        specialite3.parentNode.style.visibility = "visible"
        specialite3.value = ""
    }
}
specialite2.value = ""
specialite2.addEventListener("change", choisirSpe2)
