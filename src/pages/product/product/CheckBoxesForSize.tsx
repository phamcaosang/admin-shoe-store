import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from "react";
import { ISizeProp } from '../../../redux/apiSlicers/Product';
import { PropertyValue } from '../../../redux/apiSlicers/Property';

interface ISizeProps {
  sizes: PropertyValue[],
  setSizes: Dispatch<SetStateAction<PropertyValue[]>>,
  orginalSize: PropertyValue[],
  defaultValue?: ISizeProp[],
  children: React.ReactNode
}

const SizeBoxes: React.FC<ISizeProps> = ({ sizes, setSizes, orginalSize, defaultValue, children }: ISizeProps) => {
  console.log(defaultValue)
  const [checkList, setCheckList] = useState<CheckboxValueType[]>([]);
  // const [options, setOptions] = useState<PropertyValue[]>(sizes);
  useEffect(() => {
    setCheckList(orginalSize.map(i => i.value))
  }, [sizes.length])
  console.log(sizes)
  console.log(checkList)
  useEffect(() => {
    defaultValue && setCheckList(defaultValue?.map(i => i.propertyValueId))
  }, [])

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues);

    const result = checkedValues.map(item => {
      return sizes.find(i => i.value === item.toString()) as PropertyValue
    })
    setCheckList(result.map(i => i.value))
    setSizes(result)
  };
  return <>
    {children}
    <Checkbox.Group
      options={sizes.map(i => i.value)}
      // defaultValue={sizes.filter(i => defaultValue?.includes(i.id as string)).map(i => i.value)}
      value={checkList}
      onChange={onChange}
    />
  </>
}

export default SizeBoxes;