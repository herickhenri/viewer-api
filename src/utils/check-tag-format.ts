export function checkTagFormat(tag: string) {
  // Tag Format = I-AAAA-JJ-BBB
  // I = Unit Identification || A = Area Code || J = Equipment Code || B = Sequential Number
  // Example: I-1501-BB-220

  // check tag is upper
  const tagUpper = tag.toUpperCase()
  if (tag !== tagUpper) {
    return false
  }

  // check tag has four fields
  const tagArray = tag.split('-')
  if (tagArray.length !== 4) {
    return false
  }

  // check fields have correct size
  const [unitId, areaCode, equipmentCode, seqNumber] = tagArray
  if (
    unitId.length !== 1 ||
    areaCode.length !== 4 ||
    equipmentCode.length !== 2 ||
    seqNumber.length !== 3
  ) {
    return false
  }

  // check if the fields "area code" and "sequential number" are numbers
  if (isNaN(Number(areaCode)) || isNaN(Number(seqNumber))) {
    return false
  }

  // check is the fields only have characters from A to Z
  const alphabetRegex = /^[A-Z]+$/

  if (!alphabetRegex.test(unitId) || !alphabetRegex.test(equipmentCode)) {
    return false
  }

  return true
}
