/* eslint-disable jest/no-conditional-expect */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Card from './card'

import Configuration, {
  FileType,
  Font,
  Pattern,
  Theme
} from '../../../common/types/configType'

test('Card #1 renders', () => {
  const config: Configuration = {
    fileType: FileType.png,
    font: Font.inter,
    logo: '',
    name: 'project_name',
    pattern: Pattern.brickWall,
    theme: Theme.light
  }

  const card = shallow(<Card {...config} />)
  expect(toJson(card)).toMatchSnapshot()
  expect(card.hasClass('card-wrapper')).toBe(true)
  expect(card.prop('style').fontFamily).toStrictEqual(config.font)
  expect(card.hasClass(`theme-${config.theme.toLowerCase()}`)).toBe(true)
  expect(
    card.contains(
      <link
        href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
        rel="stylesheet"
      />
    )
  ).toBeTruthy()
  expect(
    card.contains(
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
      />
    )
  ).toBeTruthy()
  expect(card.find('.card-logo-wrapper i').length).toBe(1)
  expect(
    card.find('.card-logo-wrapper i').at(0).hasClass('devicon-github-plain')
  ).toBe(true)
  expect(card.find('.card-logo-wrapper img').exists()).toBe(false)
  expect(card.find('.card-logo-wrapper i').at(0).hasClass('colored')).toBe(true)
  expect(card.find('.card-logo-divider').length).toBe(0)
  expect(card.find('.card-name-name').text()).toStrictEqual(config.name)
  expect(card.find('.card-description-wrapper').exists()).toBe(false)
  expect(card.find('.card-badges-wrapper').length).toBe(0)
})

test('Card #2 renders', () => {
  const config: Configuration = {
    fileType: FileType.jpg,
    font: Font.koho,
    logo: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    name: 'project_name',
    pattern: Pattern.brickWall,
    theme: Theme.dark,
    description: {
      value: 'TEST DESCRIPTION',
      state: true
    },
    owner: {
      value: 'owner',
      state: true
    },
    language: {
      value: 'JavaScript',
      state: true
    },
    stargazers: {
      value: 1,
      state: true
    },
    forks: {
      value: 2,
      state: true
    },
    issues: {
      value: 3,
      state: true
    },
    pulls: {
      value: 4,
      state: true
    }
  }

  const card = shallow(<Card {...config} />)
  expect(toJson(card)).toMatchSnapshot()
  expect(card.hasClass('card-wrapper')).toBe(true)
  expect(card.prop('style').fontFamily).toStrictEqual(config.font)
  expect(card.hasClass(`theme-${config.theme.toLowerCase()}`)).toBeTruthy()
  expect(
    card.contains(
      <link
        href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
        rel="stylesheet"
      />
    )
  ).toBeTruthy()
  expect(
    card.contains(
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
      />
    )
  ).toBeTruthy()
  expect(card.find('.card-name-name').text()).toStrictEqual(config.name)
  expect(card.find('.card-logo-wrapper img').length).toBe(1)
  expect(card.find('.card-logo-wrapper img').prop('src')).toBe(config.logo)
  expect(card.find('.card-logo-wrapper i').length).toBe(1)
  expect(card.find('.card-logo-divider').length).toBe(1)
  expect(card.find('.card-description-wrapper').text()).toStrictEqual(
    config.description?.value
  )
  expect(card.find('.card-badges-wrapper').length).toBe(1)
  expect(card.find('.card-badges-wrapper > *').length).toBe(4)
  expect(
    card.find('.card-badges-wrapper > *').at(0).prop('name')
  ).toStrictEqual('stars')
  expect(
    card.find('.card-badges-wrapper > *').at(0).prop('value')
  ).toStrictEqual(`${config.stargazers?.value}`)
  expect(
    card.find('.card-badges-wrapper > *').at(1).prop('name')
  ).toStrictEqual('forks')
  expect(
    card.find('.card-badges-wrapper > *').at(1).prop('value')
  ).toStrictEqual(`${config.forks?.value}`)
  expect(
    card.find('.card-badges-wrapper > *').at(2).prop('name')
  ).toStrictEqual('issues')
  expect(
    card.find('.card-badges-wrapper > *').at(2).prop('value')
  ).toStrictEqual(`${config.issues?.value}`)
  expect(
    card.find('.card-badges-wrapper > *').at(3).prop('name')
  ).toStrictEqual('pulls')
  expect(
    card.find('.card-badges-wrapper > *').at(3).prop('value')
  ).toStrictEqual(`${config.pulls?.value}`)
})