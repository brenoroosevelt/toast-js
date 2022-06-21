import {ToastTypes as types} from "../src/toast";

test('set new type', () => {
    const newType = {bgColor: 'red', closeBtn: false}
    types.setType('new', newType)
    expect(types.getType('new').bgColor).toBe('red');
    expect(types.getType('new').closeBtn).toBe(false);
    expect(types.getType('new').align).toBe(types.default.align);
    expect(types.getType('new').position).toBe(types.default.position);
    expect(types.getType('new').duration).toBe(types.default.duration);
});

test('override a type', () => {
    const before = types.getType('error')
    types.setType('error', {closeBtn: false})
    const after = types.getType('error')
    expect(after.closeBtn).toBe(false);
    expect(after.bgColor).toBe(before.bgColor);
    expect(after.align).toBe(before.align);
    expect(after.position).toBe(before.position);
    expect(after.duration).toBe(before.duration);
});

test('get default type', () => {
    const aType = types.getType('any')
    expect(aType.closeBtn).toBe(types.default.closeBtn);
    expect(aType.bgColor).toBe(types.default.bgColor);
    expect(aType.align).toBe(types.default.align);
    expect(aType.position).toBe(types.default.position);
    expect(aType.duration).toBe(types.default.duration);
});


