const operators = new Set(['+', '−', '×', '÷']);
const precedence = { '+': 1, '−': 1, '×': 2, '÷': 2 };

const applyOperator = (values, operator) => {
  const right = values.pop();
  const left = values.pop();
  if (!Number.isFinite(left) || !Number.isFinite(right)) throw new Error('Invalid expression');
  const result = { '+': left + right, '−': left - right, '×': left * right, '÷': left / right }[operator];
  if (!Number.isFinite(result)) throw new Error('Invalid result');
  values.push(result);
};

export function calculateExpression(expression) {
  const numbers = expression.split(/[+−×÷]/).map(Number);
  const symbols = expression.match(/[+−×÷]/g) ?? [];
  if (numbers.some(Number.isNaN) || numbers.length !== symbols.length + 1) throw new Error('Invalid expression');
  const values = [numbers[0]];
  const pending = [];
  symbols.forEach((operator, index) => {
    while (pending.length && precedence[pending.at(-1)] >= precedence[operator]) applyOperator(values, pending.pop());
    pending.push(operator); values.push(numbers[index + 1]);
  });
  while (pending.length) applyOperator(values, pending.pop());
  return String(values[0]);
}
