import {date, number, object, string} from 'joi';
import {UniqueEntityId} from '../../../domain/UniqueEntityId';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface ProductListVMProps {
  readonly id: UniqueEntityId;

  readonly sku: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}

export interface JSONProductListVM {
  readonly id: string;

  readonly sku: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}

export class ProductListVM {
  private constructor(public props: ProductListVMProps) {}

  private static SCHEMA = object<ProductListVMProps>({
    id: object().instance(UniqueEntityId).required(),

    sku: string().required(),
    name: string().required(),

    price: number().required(),
    quantity: number().required(),
  }).required();

  public toJSON(): JSONProductListVM {
    return {
      id: this.props.id.toString(),

      sku: this.props.sku,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
    };
  }

  public static create(
    props: ProductListVMProps,
  ): Result<ProductListVM> {
    const guardResult = Guard.againstSchema<ProductListVMProps>(
      this.SCHEMA,
      props,
    );
    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      props = guardResult.value!;

      const promo = new ProductListVM({
        ...props,
      });

      return Result.ok(promo);
    }
  }
}
