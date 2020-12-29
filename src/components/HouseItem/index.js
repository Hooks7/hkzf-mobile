import styles from './index.module.css';
import { withRouter } from 'react-router-dom';

function HouseItem({ item, style, history }) {
	if (!!item) {
		let { title, houseImg, desc, tags, price, houseCode } = item;
		return (
			<div
				className={styles.house}
				style={style}
				onClick={() => {
					history.push(`/detail/${houseCode}`);
				}}
			>
				<div className={styles.imgWrap}>
					<img className={styles.img} src={`http://localhost:8080${houseImg}`} alt="" />
				</div>
				<div className={styles.content}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.desc}>{desc}</div>
					<div>
						{/* ['近地铁', '随时看房'] */}
						{tags.map((e) => {
							return (
								<span className={[ styles.tag, styles.tag1 ].join(' ')} key={e}>
									{e}
								</span>
							);
						})}
					</div>
					<div className={styles.price}>
						<span className={styles.priceNum}>{price}</span> 元/月
					</div>
				</div>
			</div>
		);
	}
	return <div style={style}>Loading......</div>;
}

export default withRouter(HouseItem);
