import {ToastTypes} from "../src";

test('set new type', () => {
    const newType = {bgColor: 'red', closeBtn: false}
    ToastTypes.setType('new', newType)
    expect(ToastTypes.getType('new').bgColor).toBe('red');
    expect(ToastTypes.getType('new').closeBtn).toBe(false);
    expect(ToastTypes.getType('new').justify).toBe(ToastTypes.default.justify);
    expect(ToastTypes.getType('new').position).toBe(ToastTypes.default.position);
    expect(ToastTypes.getType('new').duration).toBe(ToastTypes.default.duration);
});

test('override a type', () => {
    const before = ToastTypes.getType('error')
    ToastTypes.setType('error', {closeBtn: false})
    const after = ToastTypes.getType('error')
    expect(after.closeBtn).toBe(false);
    expect(after.bgColor).toBe(before.bgColor);
    expect(after.justify).toBe(before.justify);
    expect(after.position).toBe(before.position);
    expect(after.duration).toBe(before.duration);
});

test('get default type', () => {
    const aType = ToastTypes.getType('any')
    expect(aType.closeBtn).toBe(ToastTypes.default.closeBtn);
    expect(aType.bgColor).toBe(ToastTypes.default.bgColor);
    expect(aType.justify).toBe(ToastTypes.default.justify);
    expect(aType.position).toBe(ToastTypes.default.position);
    expect(aType.duration).toBe(ToastTypes.default.duration);
});


