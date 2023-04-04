import { ORIGINAL } from '@cloudinary/url-gen/qualifiers/audioFrequency';
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from "react";
import { ISizeProp } from '../../../redux/apiSlicers/Product';
import { PropertyValue } from '../../../redux/apiSlicers/Property';

interface ISizeProps {
  sizes: PropertyValue[],
  selectedSizes?: PropertyValue[],
  setSizes: Dispatch<SetStateAction<PropertyValue[]>>,
  defaultValue?: ISizeProp[],
  children: React.ReactNode,
  editForm: boolean
}

const SizeBoxes: React.FC<ISizeProps> = ({ sizes, selectedSizes, setSizes, defaultValue, children, editForm }: ISizeProps) => {
  const [checkList, setCheckList] = useState<CheckboxValueType[]>([]);
  useEffect(() => {
    // setCheckList(sizes.map(i => i.value))
    if (selectedSizes?.length === 0) {
      setCheckList([])
    }
  }, [selectedSizes?.length])

  useEffect(() => {
    defaultValue && setCheckList(defaultValue?.map(i => {
      if (editForm) {
        return i.propertyValue as string
      } else {
        return i.propertyValueId
      }
    }))
  }, [])
  // console.log(checkList)

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const result = checkedValues.map(item => {
      return sizes.find(i => i.value === item.toString()) as PropertyValue
    })
    console.log(result.map(i => i.value))
    console.log(sizes)
    setCheckList(result.map(i => i.value))
    setSizes(editForm ? result.map(i => {
      const found = defaultValue?.find(item => item.propertyValue === i.value)
      if (!found) {
        return {
          ...i,
          isNew: true
        }
      }
      return {
        ...i,
        isNew: found.isNew
      }
    }) : result)
  };

  return <>
    {children}
    <Checkbox.Group
      options={sizes.map(i => {
        return {
          label: i.value,
          value: i.value,
          disabled: editForm ? defaultValue?.find(item => item.propertyValue === i.value && !item.isNew) ? true : false : false
        }
      })}
      value={checkList}
      onChange={onChange}
    />
  </>
}

export default SizeBoxes;