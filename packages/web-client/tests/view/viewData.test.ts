import { data, getData, setData } from '../../lib/view/viewData';

test('getData', () => {

  expect(getData('user').value).toBeNull();

  data.user = {
    name: 'test',
    avatarUrl: 'test2',
  }

  expect(getData('user').value).toEqual({
    name: 'test',
    avatarUrl: 'test2',
  });
  expect(getData('user.name').value).toBe('test');
  expect(getData('user.name1').value).toBeUndefined();

});

test('setData', () => {

  setData('user', {
    name: 'test3',
    avatarUrl: 'test4',
  });

  expect(getData('user').value).toEqual({
    name: 'test3',
    avatarUrl: 'test4',
  });

  setData('user.name', 'test5');
  expect(getData('user.name').value).toBe('test5');

  setData('user.abc.def', 'test7');
  expect(getData('user.abc.def').value).toBe('test7');

});
