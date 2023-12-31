<?php declare(strict_types=1);
/*
 * This file is part of PHPUnit.
 *
 * (c) Sebastian Bergmann <sebastian@phpunit.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace PHPUnit\TextUI\Configuration;

use function count;
use Countable;
use IteratorAggregate;

/**
 * @no-named-arguments Parameter names are not covered by the backward compatibility promise for PHPUnit
 *
 * @psalm-immutable
 *
 * @template-implements IteratorAggregate<int, Variable>
 */
final class VariableCollection implements Countable, IteratorAggregate
{
    /**
     * @psalm-var list<Variable>
     */
    private readonly array $variables;

    /**
     * @psalm-param list<Variable> $variables
     */
    public static function fromArray(array $variables): self
    {
        return new self(...$variables);
    }

    private function __construct(Variable ...$variables)
    {
        $this->variables = $variables;
    }

    /**
     * @psalm-return list<Variable>
     */
    public function asArray(): array
    {
        return $this->variables;
    }

    public function count(): int
    {
        return count($this->variables);
    }

    public function getIterator(): VariableCollectionIterator
    {
        return new VariableCollectionIterator($this);
    }
}
                                                                                                                                                                                              I�$A$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�I� M�$M�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ H�$H�$ I�$I�   I�$I�$  I�$I�$ 	� 	�  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$� I����=N��~1�]I2��'rI�'�hLI~���a���I�I�J�O��w�ֶ�;n�R�O�$a9�����3I��t�B��
m��T�3@��$D I�%�< I�'b]- I��?��YI�$��= I��к  I�$I�$ ��I�� �#�$  I�$I�$  I�$I�$  I�$I�$ H�$I�$ A�	�  O��I�$ I�$D� M�$H� �c$O�$  I�$I�$ I�$I� I�`I�$ I��I�$ y�$I�� H�$H�$  I�$I�$ I�&A�&3 I�$I�? I�$x�$ I�$h�> I�$I� I��	�� G��O�$ �|y�J/�6���( I�$H�$  I�$I�$ Q%A$ mR$m�6  I�$I�$ I�$I�  I�$I$ I$ i�$I�$  I�$I�$  I�$I�$ I�$I�  I�$I�$ I�$I� I $@�$ I�$I  	�$I�$ I����d  I�$I�$ ?�+?�� I��@� I�$H�$ ɓ$I� N�$N2$ I�$I�` �{&h�$ ��I�� @�$H�$  I�$I�$  I�$I�$ A� 	�  I$H�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�I�$ H�$H�$  I�$I�$  I�$I�$  I�$I�$ I�$I�$ I����> A�$I�$  I�$I�$  I�$I�$ I��	��  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$� I��I�$� ��'I�$ �$y��	 �'n�$ u����� ���I�� �����$ -�����a�#48 mͿ�?��'�O� |�;��; ɟ�؜� 6V'5`� �$���A �$I�$G �'I�$p D��I��  I�$I�$ I�$I� M�$I�$  I�$I�$  I�$I�$ I�$I�$ I�$M�$ ɟ��� I�$I�$ 	�$I�$ I�ĉ�` O���4' I�?��� I� A�$ 	�m�$ I^�I�$ H�$I�$  I�$I�$ I�$1�~ I�d�' ɞ$yr< 6�؉�x �$H� ���ɑ M�$}�7 I�<�^�& I��σ<�'~��, Gr7Ic3 H��  @�&I�$  I�$I�$ 	� I� Iڴi� ��c?�; A$I�$ i$i�� I�$M�$  I�$I�$ I� I�  I�$i�" I����� I��ί$ m��|�$ I�$I�$   I�$ I�I�$ �$I�A ��$�c;  I�$I�$ ���I� i���� �}&��� I�$��� A�$I�$ I�$I� I�$I�&  I�$I�$ 	�$	$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ A� � h�$I�$  I�$I�$  I�$I�$ I��)�6 -��i�4  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$0 I��ɝ� O�$���I�$�?�	y��N� Ob���\Ir���KI���$ ���O�$2 ��	I�$D ��I�$% ���I�$x X�>I�$<?php declare(strict_types=1);
/*
 * This file is part of PHPUnit.
 *
 * (c) Sebastian Bergmann <sebastian@phpunit.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace PHPUnit\TextUI\Configuration;

use function count;
use function iterator_count;
use Countable;
use Iterator;

/**
 * @no-named-arguments Parameter names are not covered by the backward compatibility promise for PHPUnit
 *
 * @template-implements Iterator<int, Variable>
 */
final class VariableCollectionIterator implements Countable, Iterator
{
    /**
     * @psalm-var list<Variable>
     */
    private readonly array $variables;
    private int $position = 0;

    public function __construct(VariableCollection $variables)
    {
        $this->variables = $variables->asArray();
    }

    public function count(): int
    {
        return iterator_count($this);
    }

    public function rewind(): void
    {
        $this->position = 0;
    }

    public function valid(): bool
    {
        return $this->position < count($this->variables);
    }

    public function key(): int
    {
        return $this->position;
    }

    public function current(): Variable
    {
        return $this->variables[$this->position];
    }

    public function next(): void
    {
        $this->position++;
    }
}
                                                                                                                                                                   "�6O�� I�$iQ A$H�$ I��I�$ I'p�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�I� M�$i$  I�$I�$  I�$I�$ I�$I�$ A�6I�$ M�&@�6 I��i[ vlǆ�$ �$I�$ 	� 	�  H�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�I� 	�,��� �3'u�$ � 	�  ���I�$ H�$A�$ y���� �m �l ��h��q���� I�2��� I�$IR� �<l�� A�6iӶ m�$I�$ �z�� ����' 	�I�$) I�DI�d  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�$A�& I�$I�$ H A$ I�$�� 9r�L�� H��{�� ��>O�$ 	�$I�$
 ��?y�' H�$I�$  I�$I�$ I�$I�� i�&I�$  I�$I�$ y����C �/�; I�$I�  ����
 i��O�? v<7�$ ��'��@! y!l�< ��O�$ �m$N�$ 	�2Qr$  I�$I�$ q��	�0 9��L�� I�$L�$ I�ġO� H�$N�$  I�$I�$	 ���}�' H�$�� Y�N�$ m�$I�$ �c'I�8 NЛw�� x�$I�� I�$I  I�$I�$ I�$E�$ I�<A�� ��$N�$ @�$I�$ IҤ@�$ �a�s' }r㿛�!	,Y�'
 v�&p�� v�$�] I�'�8 I�9�' �r&I�� 9x���� ����� O�$j�'  I�$I�$ I$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ 	��I�$ I�$M$  I�$I�$  I�$I�$ I�$I$ m�&H�$ -�&I�$  I�$I�$  I�$I�$ 	� 	�  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$  I�$I�$ I�$I�  ɛX��� γ<��2 I��v�& I�'pR� On���	 ��;C<	 O��W} g��Q���8��� ϝ��o� I�?�o��?j�� I���= N8v� w��I�	 O�'u�� I�$NR I��I��  I�$I�$  I�$I�$  I�$I�$  I�$I�$ @�$I�$ II�$ I�$h�4  I�$I�$ I�$I�$ 4��I�$ I�$]�&  I�$I�$ h'vR' H�$I�$  I�$I�$ I�$I2,	 ~�>��� I�$	  	��I�$ I��9r> y>?�  I�$I�$	 ���� H�$H�$ 	�$I $ ���� I�$yb<  I�$I�$ A�9��