export default function PokemonCard(props){

    return(
        <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt={props.name} />
            <h3>{props.name}</h3>
        </div>
    )
}


