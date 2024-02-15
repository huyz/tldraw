import { SharedStyle, StyleProp } from '@tldraw/editor'
import * as React from 'react'
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey'
import { useTranslation } from '../../hooks/useTranslation/useTranslation'
import { TLUiIconType } from '../../icon-types'
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRoot,
	DropdownMenuTrigger,
} from '../primitives/DropdownMenu'
import { StyleValuesForUi } from './styles'

interface DoubleDropdownPickerProps<T extends string> {
	uiTypeA: string
	uiTypeB: string
	label: TLUiTranslationKey | Exclude<string, TLUiTranslationKey>
	labelA: TLUiTranslationKey | Exclude<string, TLUiTranslationKey>
	labelB: TLUiTranslationKey | Exclude<string, TLUiTranslationKey>
	itemsA: StyleValuesForUi<T>
	itemsB: StyleValuesForUi<T>
	styleA: StyleProp<T>
	styleB: StyleProp<T>
	valueA: SharedStyle<T>
	valueB: SharedStyle<T>
	onValueChange: (style: StyleProp<T>, value: T, squashing: boolean) => void
}

export const DoubleDropdownPicker = React.memo(function DoubleDropdownPicker<T extends string>({
	label,
	uiTypeA,
	uiTypeB,
	labelA,
	labelB,
	itemsA,
	itemsB,
	styleA,
	styleB,
	valueA,
	valueB,
	onValueChange,
}: DoubleDropdownPickerProps<T>) {
	const msg = useTranslation()

	const iconA = React.useMemo(
		() =>
			itemsA.find((item) => valueA.type === 'shared' && valueA.value === item.value)?.icon ??
			'mixed',
		[itemsA, valueA]
	)
	const iconB = React.useMemo(
		() =>
			itemsB.find((item) => valueB.type === 'shared' && valueB.value === item.value)?.icon ??
			'mixed',
		[itemsB, valueB]
	)

	if (valueA === undefined && valueB === undefined) return null

	return (
		<div className="tlui-style-panel__double-select-picker">
			<div title={msg(label)} className="tlui-style-panel__double-select-picker-label">
				{msg(label)}
			</div>
			<div className="tlui-buttons__horizontal">
				<DropdownMenuRoot id={`style panel ${uiTypeA} A`}>
					<DropdownMenuTrigger
						type="icon"
						data-testid={`style.${uiTypeA}`}
						title={
							msg(labelA) +
							' — ' +
							(valueA === null || valueA.type === 'mixed'
								? msg('style-panel.mixed')
								: msg(`${uiTypeA}-style.${valueA.value}` as TLUiTranslationKey))
						}
						icon={iconA as any}
						invertIcon
						smallIcon
					/>
					<DropdownMenuContent side="bottom" align="end" sideOffset={0} alignOffset={-2}>
						<div className="tlui-buttons__grid">
							{itemsA.map((item) => {
								return (
									<DropdownMenuItem
										type="icon"
										title={
											msg(labelA) +
											' — ' +
											msg(`${uiTypeA}-style.${item.value}` as TLUiTranslationKey)
										}
										data-testid={`style.${uiTypeA}.${item.value}`}
										key={item.value}
										icon={item.icon as TLUiIconType}
										onClick={() => onValueChange(styleA, item.value, false)}
										invertIcon
									/>
								)
							})}
						</div>
					</DropdownMenuContent>
				</DropdownMenuRoot>
				<DropdownMenuRoot id={`style panel ${uiTypeB}`}>
					<DropdownMenuTrigger
						type="icon"
						data-testid={`style.${uiTypeB}`}
						title={
							msg(labelB) +
							' — ' +
							(valueB === null || valueB.type === 'mixed'
								? msg('style-panel.mixed')
								: msg(`${uiTypeB}-style.${valueB.value}` as TLUiTranslationKey))
						}
						icon={iconB as any}
						smallIcon
					/>
					<DropdownMenuContent side="bottom" align="end" sideOffset={0} alignOffset={-2}>
						<div className="tlui-buttons__grid">
							{itemsB.map((item) => {
								return (
									<DropdownMenuItem
										type="icon"
										title={
											msg(labelB) +
											' — ' +
											msg(`${uiTypeB}-style.${item.value}` as TLUiTranslationKey)
										}
										data-testid={`style.${uiTypeB}.${item.value}`}
										key={item.value}
										icon={item.icon as TLUiIconType}
										onClick={() => onValueChange(styleB, item.value, false)}
									/>
								)
							})}
						</div>
					</DropdownMenuContent>
				</DropdownMenuRoot>
			</div>
		</div>
	)
})
